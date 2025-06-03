/**
 * Space Cowboy - Common JavaScript Utilities
 * 共通のJavaScript機能を提供するメインスクリプト
 */

const SpaceCowboy = {
    /**
     * 初期化メソッド
     * @param {Object} options - 設定オプション
     * @param {number} options.starCount - 星の数（デフォルト: 100）
     * @param {number} options.parallaxSpeed - パララックスの速度（デフォルト: 0.0）
     * @param {boolean} options.enableSmoothScroll - スムーススクロールを有効化
     */
    init: function(options = {}) {
        // DOMContentLoadedイベントを待つ
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this._initialize(options);
            });
        } else {
            this._initialize(options);
        }
    },

    _initialize: function(options) {
        this.initMobileMenu();
        this.initStars(options.starCount || 100);
        this.initParallax(options.parallaxSpeed || 0.0);
        this.initBackButton();
        
        if (options.enableSmoothScroll) {
            this.initSmoothScroll();
        }
    },

    /**
     * モバイルメニューの初期化
     */
    initMobileMenu: function() {
        const menuButton = document.getElementById('menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        console.log('initMobileMenu called');
        console.log('menuButton:', menuButton);
        console.log('mobileMenu:', mobileMenu);
        
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', function(e) {
                console.log('Menu button clicked');
                e.preventDefault();
                mobileMenu.classList.toggle('hidden');
                console.log('Menu visibility toggled, hidden class:', mobileMenu.classList.contains('hidden'));
            });
        } else {
            console.error('Menu elements not found');
        }
    },

    /**
     * 星空背景の作成
     * @param {number} count - 星の数
     */
    initStars: function(count) {
        const starsContainer = document.getElementById('stars');
        
        if (!starsContainer) return;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    },

    /**
     * iOSデバイスのパララックス修正
     * @param {number} speed - パララックスの速度
     */
    initParallax: function(speed) {
        if (!this.isiOS()) return;
        
        const parallaxBg = document.getElementById('parallax-bg');
        if (!parallaxBg) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    },

    /**
     * iOSデバイスの検出
     * @returns {boolean} iOSデバイスかどうか
     */
    isiOS: function() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    },

    /**
     * 戻るボタンの初期化（プライバシーポリシーなどのページ用）
     */
    initBackButton: function() {
        const backButton = document.getElementById('backButton');
        const backButtonText = document.getElementById('backButtonText');
        
        if (!backButton || !backButtonText) return;
        
        const referrer = document.referrer;
        
        if (referrer.includes('space_oracle.html')) {
            backButtonText.textContent = 'Space Oracleに戻る';
            backButton.onclick = () => window.location.href = 'space_oracle.html';
        } else if (referrer.includes('index.html') || referrer.endsWith('/')) {
            backButtonText.textContent = 'ホームに戻る';
            backButton.onclick = () => window.location.href = 'index.html';
        } else {
            backButtonText.textContent = '前のページに戻る';
            backButton.onclick = () => window.history.back();
        }
    },

    /**
     * スムーススクロールの初期化
     */
    initSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// グローバルスコープに公開
window.SpaceCowboy = SpaceCowboy;

// 自動初期化を無効化（各ページで手動初期化を行うため）
// document.addEventListener('DOMContentLoaded', function() {
//     const autoInit = document.body.getAttribute('data-spacecowboy-init');
//     
//     if (autoInit !== 'false') {
//         // デフォルトオプションで初期化
//         const starCount = parseInt(document.body.getAttribute('data-star-count')) || 100;
//         const enableSmoothScroll = document.body.getAttribute('data-smooth-scroll') === 'true';
//         
//         SpaceCowboy.init({
//             starCount: starCount,
//             enableSmoothScroll: enableSmoothScroll
//         });
//     }
// });