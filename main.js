// 設定
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzslfeAls6qi_h_hMpBTsy5FjlTLrgdzX0qm9PSCNTNS9xLJsx6xEW_fCjHLa0B2huW/exec';

// 星空の生成
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// 登録者数の取得と更新（Google Sheets API連携）
async function updateRegistrationCount() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error);
            return;
        }

        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        progressBar.style.width = data.percentage + '%';
        progressText.textContent = `${data.current}名 / ${data.target}名`;

        // CTAテキストの更新
        if (data.remaining > 0) {
            document.querySelector('.cta-text').textContent = `あと${data.remaining}名でサービス開始！`;
        } else {
            document.querySelector('.cta-text').textContent = '🎉 目標達成！まもなくサービス開始します';
        }

        // マイルストーンの更新
        updateMilestones(data.current);

    } catch (error) {
        console.error('Failed to fetch registration count:', error);
    }
}

// マイルストーンの更新
function updateMilestones(current) {
    const milestones = [
        { target: 100, element: document.querySelector('.milestone-item:nth-child(1) .milestone-label') },
        { target: 300, element: document.querySelector('.milestone-item:nth-child(2) .milestone-label') },
        { target: 500, element: document.querySelector('.milestone-item:nth-child(3) .milestone-label') }
    ];

    milestones.forEach(milestone => {
        if (milestone.element && current >= milestone.target) {
            milestone.element.innerHTML = '✓ 達成！';
            milestone.element.style.color = '#667eea';
        }
    });
}

// フォーム送信処理
function initForm() {
    const form = document.getElementById("registration-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append("name", document.querySelector("input[name='name']").value);
        formData.append("email", document.querySelector("input[name='email']").value);

        fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        })
            .then((response) => response.text())
            .then((data) => {
                console.log("Success:", data);
                document.getElementById("form-message").textContent = "登録が完了しました！";
                document.getElementById("form-message").style.color = "#667eea";
                // フォーム送信後に即座にカウンター更新
                setTimeout(updateRegistrationCount, 1000);
            })
            .catch((error) => {
                console.error("Error:", error);
                document.getElementById("form-message").textContent = "エラーが発生しました。";
                document.getElementById("form-message").style.color = "#ff4444";
            });
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    updateRegistrationCount();
    initForm();
    
    // 30秒ごとに登録者数を更新
    setInterval(updateRegistrationCount, 30000);
});