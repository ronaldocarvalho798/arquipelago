
document.addEventListener('DOMContentLoaded', () => {


    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const enterButton = document.getElementById('enter-button');
    const audio = document.getElementById('campfire-audio');
    const video = document.getElementById('campfire-video');


    if (enterButton && splashScreen && mainContent && audio && video) {
        
        enterButton.addEventListener('click', () => {
            

            audio.volume = 0.5;
            audio.play();


            video.play();


            splashScreen.classList.add('is-hidden');
            mainContent.classList.add('is-visible');

            startChapterObserver();

        }, { once: true });
    }


    function startChapterObserver() {
        const panel = document.getElementById('chronicle-panel');
        const chapters = document.querySelectorAll('.chapter-content');

        if (panel && chapters.length > 0) {
            const observerOptions = {
                root: panel, 
                rootMargin: '0px 0px -50px 0px', 
                threshold: 0.01 
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);
            chapters.forEach(chapter => {
                observer.observe(chapter);
            });
        }
    }
});