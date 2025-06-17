class ScrollSwitcher {
    /**
     * @param {HTMLElement} imgElement - The image element to switch.
     * @param {string[]} imageSources - Array of image src strings.
     */
    constructor(imgElement, imageSources) {
        if (!imgElement || !Array.isArray(imageSources) || imageSources.length === 0) return;
        this.imgElement = imgElement;
        this.imageSources = imageSources;
        this.currentIndex = imageSources.indexOf(imgElement.src) >= 0 ? imageSources.indexOf(imgElement.src) : 0;
        this.imgElement.src = this.imageSources[this.currentIndex];
        this.hasBeenOutOfView = false;

        // Bind the scroll handler
        this._onScroll = this._onScroll.bind(this);
        window.addEventListener('scroll', this._onScroll, { passive: true });
    }

    _isOutOfView() {
        const rect = this.imgElement.getBoundingClientRect();
        const buffer = 100; // px
        return (
            rect.bottom < -buffer ||
            rect.top > (window.innerHeight || document.documentElement.clientHeight) + buffer
        );
    }

    _onScroll() {
        if (this._isOutOfView()) {
            if (!this.hasBeenOutOfView) {
                console.log('Image is out of view, switching to next image.');
                this._nextImage();
                this.hasBeenOutOfView = true;
            }
        } else {
            this.hasBeenOutOfView = false;
        }
    }

    _nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.imageSources.length;
        this.imgElement.src = this.imageSources[this.currentIndex];
    }

    // Optional: call this to remove the scroll listener if needed
    destroy() {
        window.removeEventListener('scroll', this._onScroll);
    }
}

new ScrollSwitcher(document.getElementById('mainimage'), [
    'images/JCCAframe-square.jpg',
    'images/SocialNightMC.jpg',
    'images/suit-profile-website.jpg',
    'images/SpeechGiving-square.jpg',
    'images/sword-picture-square.jpg',
]);