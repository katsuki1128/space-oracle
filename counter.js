// 登録者数カウンター
class RegistrationCounter {
    constructor() {
        // Google Apps ScriptのWebアプリURLを設定
        // デプロイ後に取得したURLに置き換えてください
        this.API_URL = 'https://script.google.com/macros/s/AKfycbzslfeAls6qi_h_hMpBTsy5FjlTLrgdzX0qm9PSCNTNS9xLJsx6xEW_fCjHLa0B2huW/exec';
        this.updateInterval = 30000; // 30秒ごとに更新
        this.init();
    }

    async init() {
        // 初回読み込み
        await this.updateCount();

        // 定期更新を開始
        setInterval(() => this.updateCount(), this.updateInterval);
    }

    async updateCount() {
        try {
            // APIからデータ取得
            const response = await fetch(this.API_URL);
            const data = await response.json();

            if (data.error) {
                console.error('API Error:', data.error);
                return;
            }

            // UI更新
            this.updateUI(data);

        } catch (error) {
            console.error('Failed to fetch registration count:', error);
            // エラー時はローカルストレージから前回の値を使用
            this.useLocalCache();
        }
    }

    updateUI(data) {
        // プログレスバーの更新
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const ctaText = document.querySelector('.cta-text');

        if (progressBar && progressText) {
            // アニメーション付きで幅を更新
            progressBar.style.width = data.percentage + '%';
            progressText.textContent = `${data.current}名 / ${data.target}名`;
        }

        if (ctaText) {
            if (data.remaining > 0) {
                ctaText.textContent = `あと${data.remaining}名でサービス開始！`;
            } else {
                ctaText.textContent = '🎉 目標達成！まもなくサービス開始します';
            }
        }

        // マイルストーンの更新
        this.updateMilestones(data.current);

        // ローカルキャッシュに保存
        this.saveToLocalCache(data);
    }

    updateMilestones(current) {
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

    saveToLocalCache(data) {
        localStorage.setItem('registrationData', JSON.stringify({
            ...data,
            cachedAt: Date.now()
        }));
    }

    useLocalCache() {
        const cached = localStorage.getItem('registrationData');
        if (cached) {
            const data = JSON.parse(cached);
            // 1時間以内のキャッシュなら使用
            if (Date.now() - data.cachedAt < 3600000) {
                this.updateUI(data);
            }
        }
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationCounter();
});