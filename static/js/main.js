// 設定
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzslfeAls6qi_h_hMpBTsy5FjlTLrgdzX0qm9PSCNTNS9xLJsx6xEW_fCjHLa0B2huW/exec';

// マイルストーンのターゲット値
const MILESTONE_TARGETS = {
    count1: 1000,
    count2: 3000,
    count3: 5000
};
const TARGET_COUNT = 1000;

// 言語設定
let currentLanguage = 'en';

// 言語データ
const translations = {
    ja: {
        title: "Space Oracle - A message from the universe",
        heroTitle: "慌ただしさの中でも、宇宙はあなたに語りかける。",
        heroSubtitle: "人工衛星があなたの頭上を通る瞬間、運命が動き出す。",
        sectionTitle: "空を見上げられなくても、宇宙はあなたを見守っている",
        sectionText1: "朝の通勤電車で、ランチタイムのわずかな休憩で、寝る前の5分間で。",
        sectionText2: "あなたの真上を通過する人工衛星が、今日の運勢をお届けします。",
        sectionText3: "1日たった1分。スマホを開くだけで、400km上空からの特別なメッセージが、あなたの日常に小さな宇宙のロマンをもたらします。",
        preRegister: "🚀 事前登録受付中",
        ctaRemaining: "あと{n}名でサービス開始！",
        ctaSuccess: "🎉 目標達成！まもなくサービス開始します",
        countUnit: "名",
        milestone1: "開発スタート",
        milestone2: "β版リリース",
        milestone3: "正式サービス化",
        emailLabel: "メールアドレス（必須）",
        nameLabel: "お名前（任意）",
        submitButton: "無料で事前登録する",
        note1: "※ 事前登録は無料です",
        note2: "※ 目標未達成の場合、お預かりした情報は責任を持って削除いたします",
        note3: "※ 事前登録者限定で、正式版を永久20%OFFでご利用いただけます",
        progressText: "{current}名 / {target}名",
        milestoneAchieved: "✓ 達成！",
        formSuccessMessage: "登録が完了しました！",
        formErrorMessage: "エラーが発生しました。",
        heroCtaText: "🚀 早期アクセスを取得",
        conceptCtaText: "宇宙の旅を始める",
        supportTitle: "宇宙デジタル体験プロジェクトを支援",
        supportDescription1: "本購入は、宇宙と星座を活用したデジタルエンタメ体験を支援する目的のものです。物理的な商品の発送はなく、購入後の返金はできません。",
        pricingTitle: "価格・ポリシー",
        pricingInfo: "• 価格：500円 または USD 3〜5（1回限りの支援）",
        refundPolicy: "• 返金不可：支援という性質上、返金には応じられません",
        supportCtaText: "このプロジェクトを支援する",
        stripeTitle: "Space Oracleプロジェクトを支援",
        stripeDescription: "あなたの支援により、宇宙とクリエイティブを融合した新しいエンターテイメントの形を実現できます。",
        stripeCTA: "500円で支援する",
        footerCompany: "株式会社スペースカウボーイ",
        footerTokushoho: "特定商取引法に基づく表記",
        footerPrivacy: "プライバシーポリシー",
        footerTerms: "利用規約"
    },
    en: {
        title: "Space Oracle - A message from the universe",
        heroTitle: "Even in chaos, the universe speaks.",
        heroSubtitle: "When a satellite passes overhead, your destiny shifts.",
        sectionTitle: "Even when you can't look up, the cosmos watches over you.",
        sectionText1: "During your morning commute, your lunch break, or just before bed,",
        sectionText2: "a satellite passing overhead delivers your fortune.",
        sectionText3: "Just one minute a day. One tap reveals a message from 400 km above — a little cosmic magic in your everyday.",
        preRegister: "🚀 Pre-registration Open",
        ctaRemaining: "{n} signups left until launch!",
        ctaSuccess: "🎉 Goal reached! Launching soon",
        countUnit: "",
        milestone1: "Development Started",
        milestone2: "Beta Release",
        milestone3: "Official Launch",
        emailLabel: "Email Address (Required)",
        nameLabel: "Name (Optional)",
        submitButton: "Sign Up for Free",
        note1: "※ Pre-registration is free",
        note2: "※ If targets are not met, your information will be responsibly deleted",
        note3: "※ Pre-registrants get permanent 20% OFF on the official version",
        progressText: "{current} / {target}",
        milestoneAchieved: "✓ Achieved!",
        formSuccessMessage: "Registration completed!",
        formErrorMessage: "An error occurred.",
        heroCtaText: "🚀 Get Early Access",
        conceptCtaText: "Start Your Cosmic Journey",
        supportTitle: "Support Our Space Digital Experience Project",
        supportDescription1: "This is a one-time support purchase for a space-based digital experience project. No physical products will be shipped. The purchase is not refundable.",
        pricingTitle: "Pricing & Policy",
        pricingInfo: "• Price: ¥500 or USD 3-5 (One-time support)",
        refundPolicy: "• No Refunds: Due to the support nature, refunds are not available",
        supportCtaText: "Support This Project",
        stripeTitle: "Support the Space Oracle Project",
        stripeDescription: "Your support helps us bring space and creativity together in a new form of entertainment.",
        stripeCTA: "Support with $3.00",
        footerCompany: "Space Cowboy Inc.",
        footerTokushoho: "Specified Commercial Transactions Act",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service"
    }
};

// マイルストーン数値の初期化
function initializeMilestoneNumbers() {
    document.getElementById('count1').textContent = MILESTONE_TARGETS.count1;
    document.getElementById('count2').textContent = MILESTONE_TARGETS.count2;
    document.getElementById('count3').textContent = MILESTONE_TARGETS.count3;
}

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

        updateUI(data);
        saveToLocalCache(data);

    } catch (error) {
        console.error('Failed to fetch registration count:', error);
        useLocalCache();
    }
}

// UI更新処理
function updateUI(data) {
    const current = data.current;
    const remaining = Math.max(0, TARGET_COUNT - current);
    const percentage = Math.round((current / TARGET_COUNT) * 100);

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const ctaText = document.getElementById('ctaText');

    if (progressBar && progressText) {
        progressBar.style.width = percentage + '%';
        const lang = translations[currentLanguage];
        progressText.textContent = lang.progressText.replace('{current}', current).replace('{target}', TARGET_COUNT);
    }

    console.log(`Current: ${current}, Target: ${TARGET_COUNT}, Percentage: ${percentage}%`);

    const lang = translations[currentLanguage];

    if (ctaText) {
        if (remaining > 0) {
            ctaText.textContent = lang.ctaRemaining.replace('{n}', remaining);
            console.log(`Remaining: ${ctaText.textContent}`);
        } else {
            ctaText.textContent = lang.ctaSuccess;
        }
    }

    updateMilestones(current);
}

// ローカルキャッシュ保存
function saveToLocalCache(data) {
    localStorage.setItem('registrationData', JSON.stringify({
        ...data,
        cachedAt: Date.now()
    }));
}

// ローカルキャッシュ使用
function useLocalCache() {
    const cached = localStorage.getItem('registrationData');
    if (cached) {
        const data = JSON.parse(cached);
        // 1時間以内のキャッシュなら使用
        if (Date.now() - data.cachedAt < 3600000) {
            updateUI(data);
        }
    }
}

// マイルストーンの更新
function updateMilestones(current) {
    const milestones = [
        { target: MILESTONE_TARGETS.count1, element: document.querySelector('.milestone-item:nth-child(1) .milestone-label') },
        { target: MILESTONE_TARGETS.count2, element: document.querySelector('.milestone-item:nth-child(2) .milestone-label') },
        { target: MILESTONE_TARGETS.count3, element: document.querySelector('.milestone-item:nth-child(3) .milestone-label') }
    ];

    milestones.forEach(milestone => {
        if (milestone.element && current >= milestone.target) {
            milestone.element.innerHTML = translations[currentLanguage].milestoneAchieved;
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
                document.getElementById("form-message").textContent = translations[currentLanguage].formSuccessMessage;
                document.getElementById("form-message").style.color = "#667eea";
                // フォーム送信後に即座にカウンター更新
                setTimeout(updateRegistrationCount, 1000);
            })
            .catch((error) => {
                console.error("Error:", error);
                document.getElementById("form-message").textContent = translations[currentLanguage].formErrorMessage;
                document.getElementById("form-message").style.color = "#ff4444";
            });
    });
}

// 言語切り替え機能
function toggleLanguage(targetLang) {
    if (targetLang && targetLang !== currentLanguage) {
        currentLanguage = targetLang;
    } else if (!targetLang) {
        currentLanguage = currentLanguage === 'ja' ? 'en' : 'ja';
    }

    updateLanguage();
    updateToggleButtons();
}

// トグルボタンの表示更新
function updateToggleButtons() {
    const jpText = document.getElementById('jpText');
    const enText = document.getElementById('enText');

    if (currentLanguage === 'ja') {
        jpText.classList.add('active');
        enText.classList.remove('active');
    } else {
        jpText.classList.remove('active');
        enText.classList.add('active');
    }
}

// 言語更新
function updateLanguage() {
    const lang = translations[currentLanguage];

    // タイトル更新
    document.title = lang.title;

    // メインテキスト更新
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) heroTitle.textContent = lang.heroTitle;

    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = lang.heroSubtitle;

    // セクションテキスト更新
    const sectionTitle = document.getElementById('sectionTitle');
    if (sectionTitle) sectionTitle.textContent = lang.sectionTitle;

    const sectionText1 = document.getElementById('sectionText1');
    if (sectionText1) sectionText1.textContent = lang.sectionText1;

    const sectionText2 = document.getElementById('sectionText2');
    if (sectionText2) sectionText2.textContent = lang.sectionText2;

    const sectionText3 = document.getElementById('sectionText3');
    if (sectionText3) sectionText3.textContent = lang.sectionText3;

    // フォームセクション更新
    const preRegisterTitle = document.getElementById('preRegisterTitle');
    if (preRegisterTitle) preRegisterTitle.textContent = lang.preRegister;

    // CTAテキスト再表示（数値を保ったまま言語のみ切り替える）
    const ctaText = document.getElementById('ctaText');
    if (ctaText) {
        const current = ctaText.textContent;
        const num = current.match(/\d+/); // 登録数
        if (num && parseInt(num[0])) {
            const template = translations[currentLanguage].ctaRemaining;
            ctaText.textContent = template.replace('{n}', num[0]);
        } else {
            ctaText.textContent = translations[currentLanguage].ctaSuccess;
        }
    }


    // マイルストーン更新
    const milestone1 = document.getElementById('milestone1');
    if (milestone1 && !milestone1.textContent.includes('✓')) {
        milestone1.textContent = lang.milestone1;
    }

    const milestone2 = document.getElementById('milestone2');
    if (milestone2 && !milestone2.textContent.includes('✓')) {
        milestone2.textContent = lang.milestone2;
    }

    const milestone3 = document.getElementById('milestone3');
    if (milestone3 && !milestone3.textContent.includes('✓')) {
        milestone3.textContent = lang.milestone3;
    }

    // フォームラベル更新
    const emailLabel = document.getElementById('emailLabel');
    if (emailLabel) {
        emailLabel.innerHTML = lang.emailLabel + '<br><input type="email" name="email" required style="width: 100%; padding: 10px; margin: 10px 0;">';
    }

    const nameLabel = document.getElementById('nameLabel');
    if (nameLabel) {
        nameLabel.innerHTML = lang.nameLabel + '<br><input type="text" name="name" style="width: 100%; padding: 10px; margin: 10px 0;">';
    }

    // ボタンテキスト更新
    const submitButton = document.getElementById('submitButton');
    if (submitButton) submitButton.textContent = lang.submitButton;

    // 注意書き更新
    const noteElement = document.getElementById('noteText');
    if (noteElement) {
        noteElement.innerHTML = lang.note1 + '<br>' + lang.note2 + '<br>' + lang.note3;
    }

    // カウントの単位（"名" など）の切り替え
    const countUnitEls = document.querySelectorAll('.countUnit');
    countUnitEls.forEach(el => {
        el.textContent = lang.countUnit;
    });

    // CTAボタンテキスト更新
    const heroCtaText = document.getElementById('heroCtaText');
    if (heroCtaText) heroCtaText.textContent = lang.heroCtaText;

    const conceptCtaText = document.getElementById('conceptCtaText');
    if (conceptCtaText) conceptCtaText.textContent = lang.conceptCtaText;

    // 支援セクション更新
    const supportTitle = document.getElementById('supportTitle');
    if (supportTitle) supportTitle.textContent = lang.supportTitle;

    const supportDescription1 = document.getElementById('supportDescription1');
    if (supportDescription1) supportDescription1.textContent = lang.supportDescription1;

    const pricingTitle = document.getElementById('pricingTitle');
    if (pricingTitle) pricingTitle.textContent = lang.pricingTitle;

    const pricingInfo = document.getElementById('pricingInfo');
    if (pricingInfo) pricingInfo.textContent = lang.pricingInfo;

    const refundPolicy = document.getElementById('refundPolicy');
    if (refundPolicy) refundPolicy.textContent = lang.refundPolicy;

    const supportCtaText = document.getElementById('supportCtaText');
    if (supportCtaText) supportCtaText.textContent = lang.supportCtaText;

    // Stripeセクション更新
    const stripeTitle = document.getElementById('stripeTitle');
    if (stripeTitle) stripeTitle.textContent = lang.stripeTitle;

    const stripeDescription = document.getElementById('stripeDescription');
    if (stripeDescription) stripeDescription.textContent = lang.stripeDescription;

    const stripeCTA = document.getElementById('stripeCTA');
    if (stripeCTA) stripeCTA.textContent = lang.stripeCTA;

    // フッター更新
    const footerCompany = document.getElementById('footerCompany');
    if (footerCompany) footerCompany.textContent = lang.footerCompany;

    const footerTokushoho = document.getElementById('footerTokushoho');
    if (footerTokushoho) footerTokushoho.textContent = lang.footerTokushoho;

    const footerPrivacy = document.getElementById('footerPrivacy');
    if (footerPrivacy) footerPrivacy.textContent = lang.footerPrivacy;

    const footerTerms = document.getElementById('footerTerms');
    if (footerTerms) footerTerms.textContent = lang.footerTerms;
}

// スムーススクロール機能
function scrollToFormSection() {
    const formSection = document.querySelector('.form-section');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// CTAボタンイベント設定
function initCTAButtons() {
    const heroCTA = document.getElementById('heroCTA');
    const conceptCTA = document.getElementById('conceptCTA');
    const supportCTA = document.getElementById('supportCTA');

    if (heroCTA) {
        heroCTA.addEventListener('click', scrollToFormSection);
    }

    if (conceptCTA) {
        conceptCTA.addEventListener('click', scrollToFormSection);
    }

    if (supportCTA) {
        supportCTA.addEventListener('click', scrollToFormSection);
    }
}

// トグルボタンイベント設定
function initLanguageToggle() {
    const jpText = document.getElementById('jpText');
    const enText = document.getElementById('enText');

    if (jpText) {
        jpText.addEventListener('click', () => toggleLanguage('ja'));
    }

    if (enText) {
        enText.addEventListener('click', () => toggleLanguage('en'));
    }

    // 初期状態の設定
    updateToggleButtons();
}

// 初期化
document.addEventListener('DOMContentLoaded', function () {
    initializeMilestoneNumbers();
    updateLanguage();
    createStars();
    updateRegistrationCount();
    initForm();
    initLanguageToggle();
    initCTAButtons();

    // 30秒ごとに登録者数を更新
    setInterval(updateRegistrationCount, 30000);
});