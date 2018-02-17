const ACTIVE_SLIDE_CSS_CLASS = 'slide_active';
const ACTIVE_PAGER_ITEM_CSS_CLASS = 'pager__item_active';

class Carousel {
    /**
     * @param {Object} cssSelector
     * @param {Object} configs
     * @param {Boolean} configs.withPager
     * */
    constructor(cssSelector, configs) {
        this.withPager = configs.withPager;
        this.carousel = $(cssSelector);
        this.slides = $(this.carousel.find('.slide'));
        this.controlNext = null;
        this.controlPrev = null;
        this.activeSlideIndex = 1;
        this.pagerItems = [];
        this.init();
    }

    init() {
        this.wrapContent();
        this.renderControls();
        if (this.withPager) {
            this.renderPager();
        }

        this.handleEvents();
        this.switchSlide();
    }

    wrapContent() {
        this.slides.wrapAll(
            $('<div class="carousel__slides"></div>')
        );
    }

    renderControls() {
        const controlsWrapper = $('<div class="slider__controls"></div>');

        this.controlNext = $('<i class="control icon-right"></i>');
        this.controlPrev = $('<i class="control icon-left"></i>');

        controlsWrapper.append(this.controlPrev).append(this.controlNext);

        this.carousel.append(controlsWrapper);
    }

    renderPager() {
        this.pagerItems = [];
        const pagerWrapper = $('<ul>').addClass('carousel__pager pager');

        $.each(this.slides, (i) => {
            const pagerItem = $('<li class="pager__item">');

            if (this.activeSlideIndex === i) {
                pagerItem.addClass(ACTIVE_PAGER_ITEM_CSS_CLASS);
            }

            pagerItem.on('click', () => {
                this.activeSlideIndex = i;
                this.switchSlide();
            });

            this.pagerItems.push(pagerItem);
            pagerWrapper.append(pagerItem);
        });

        this.carousel.append(pagerWrapper);
    }

    enableSlide() {
        const slide = this.slides[this.activeSlideIndex];
        if (slide === undefined) {
            throw new Error('Active slide index should be from 0 to slide length');
        }
        $(slide).addClass(ACTIVE_SLIDE_CSS_CLASS);
    }

    disableSlides() {
        $.each(this.slides, (i, slide) => {
            $(slide).removeClass(ACTIVE_SLIDE_CSS_CLASS);
        });
    }

    switchImage() {
        this.disableSlides();
        this.enableSlide();
    }

    switchPager() {
        const currentPagerItem = this.pagerItems[this.activeSlideIndex];

        this.pagerItems.forEach((item) => {
            item.removeClass(ACTIVE_PAGER_ITEM_CSS_CLASS);
        });

        currentPagerItem.addClass(ACTIVE_PAGER_ITEM_CSS_CLASS);
    }

    increaseSlideIndex() {
        if (this.activeSlideIndex + 1 < this.slides.length) {
            this.activeSlideIndex++;
        } else {
            this.activeSlideIndex = 0;
        }
    }

    decreaseSlideIndex() {
        if (this.activeSlideIndex - 1 >= 0) {
            this.activeSlideIndex--;
        } else {
            this.activeSlideIndex = this.slides.length - 1;
        }
    }

    switchSlide() {
        this.switchImage();
        if(this.withPager) {
            this.switchPager();
        }
    }

    handleEvents() {
        this.controlNext.on('click', () => {
            this.increaseSlideIndex();
            this.switchSlide();
        });
        this.controlPrev.on('click', () => {
            this.decreaseSlideIndex();
            this.switchSlide();
        });
    }
}
export { Carousel };