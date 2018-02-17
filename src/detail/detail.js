import { Carousel } from '../common/scripts/carousel.js';
import './detail.less';

const headerCarousel = new Carousel('.header-carousel', {withPager:true});
$('.header__nav-menu-icon').click(function () {
    $('.header__dropdown-menu').toggleClass('open');
});