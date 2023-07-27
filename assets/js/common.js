(function () {
	"use strict";

	var slideMenu = $('.side-menu');

	// Toggle Sidebar
	$(document).on('click', '[data-bs-toggle="sidebar"]', function (event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	responsive();


	var toggleSidebar = function () {
		var w = $(window);
		if (w.outerWidth() <= 1024) {
			$("body").addClass("sidebar-gone");
			$(document).off("click", "body").on("click", "body", function (e) {
				if ($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
					$("body").removeClass("sidebar-show");
					$("body").addClass("sidebar-gone");
					$("body").removeClass("search-show");
				}
			});
		} else {
			$("body").removeClass("sidebar-gone");
		}
	}
	toggleSidebar();
	$(window).resize(toggleSidebar);





	//sticky-header
	$(window).on("scroll", function (e) {
		if ($(window).scrollTop() >= 70) {
			$('.main-header').addClass('fixed-header');
			$('.main-header').addClass('visible-title');
		}
		else {
			$('.main-header').removeClass('fixed-header');
			$('.main-header').removeClass('visible-title');
		}
	});
})();
function responsive() {
	if (window.innerWidth >= 992) {
		if (document.querySelector("body").classList.contains("sidenav-toggled") && document.querySelector("body").classList.contains("horizontal")) {
			document.querySelector("body").classList.remove("sidenav-toggled")
		}
	}
}

function hovermenu() {

	$(".app-sidebar").hover(function () {
		if ($('.app').hasClass('sidenav-toggled')) {
			$('.app').addClass('sidenav-toggled-open');
		}
	}, function () {
		if ($('.app').hasClass('sidenav-toggled')) {
			$('.app').removeClass('sidenav-toggled-open');
		}
	});
}

// ______________ICON-TEXT JS start
function icontext() {
	$(".app-sidebar").off("mouseenter mouseleave");

	$(document).on('click', ".app-sidebar", function (event) {
		if ($('body').hasClass('sidenav-toggled') == true) {
			$('body').addClass('sidenav-toggled-open');
		}
	});

	$(document).on('click', ".main-content", function (event) {
		$('body').removeClass('sidenav-toggled-open');
	});
}

//________________Horizontal js
jQuery(function () {
	'use strict';
	document.addEventListener("touchstart", function () { }, false);
	jQuery(function () {
		jQuery('body').wrapInner('<div class="horizontalMenucontainer" />');
	});
}());

// To remove expanded menu on click 'body'
$(document).on('click', '.horizontal-content', function () {
	if (window.innerWidth >= 992) {
		$(".app-sidebar li a").each(function () {
			$(this).next().slideUp(300, function () {
				$(this).next().removeClass('open');
			});
			$(this).parent("li").removeClass("is-expanded");
		})
	}
})



// ______________Active Class
var position = window.location.pathname.split('/');
$(".app-sidebar li a").each(function () {
	var $this = $(this);
	var pageUrl = $this.attr("href");

	if (pageUrl) {
		if (position[position.length - 1] == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("is-expanded");
			$(this).parent().parent().prev().addClass("active");
			$(this).parent().parent().addClass("open");
			$(this).parent().parent().prev().addClass("is-expanded");
			$(this).parent().parent().parent().addClass("is-expanded");
			$(this).parent().parent().parent().parent().addClass("open");
			$(this).parent().parent().parent().parent().prev().addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("is-expanded");
			return false;
		}
	}
});
if ($('.slide-item').hasClass('active')) {
	$('.app-sidebar').animate({
		scrollTop: $('a.slide-item.active').offset().top - 600
	}, 600);
}
if ($('.sub-side-menu__item').hasClass('active')) {
	$('.app-sidebar').animate({
		scrollTop: $('a.sub-side-menu__item.active').offset().top - 600
	}, 600);
}


let slideLeft = document.querySelector(".slide-left");
let slideRight = document.querySelector(".slide-right");
slideLeft.addEventListener("click", () => {
	slideClick()
}, true)
slideRight.addEventListener("click", () => { slideClick() }, true)

// used to remove is-expanded class and remove class on clicking arrow buttons
function slideClick() {
	let slide = document.querySelectorAll(".slide");
	let slideMenu = document.querySelectorAll(".slide-menu");
	slide.forEach((element, index) => {
		if (element.classList.contains("is-expanded") == true) {
			element.classList.remove("is-expanded")
		}
	});
	slideMenu.forEach((element, index) => {
		if (element.classList.contains("open") == true) {
			element.classList.remove("open");
			element.style.display = "none";
		}
	});
}

// horizontal arrows
var sideMenu = $(".side-menu");
var slide = "100px";
let prevWidth = [window.innerWidth]

let menuWidth = document.querySelector('.horizontal-main')
let menuItems = document.querySelector('.side-menu')

$(window).resize(
	() => {
		let menuWidth = document.querySelector('.horizontal-main');
		let menuItems = document.querySelector('.side-menu');
		let mainSidemenuWidth = document.querySelector('.main-sidemenu');
		let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
		let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]);
		let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]);
		let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
		// to check and adjst the menu on screen size change
		if ($('body').hasClass('ltr')) {
			if (marginLeftValue > -check == false && (menuWidth?.offsetWidth - menuContainerWidth) < menuItems.scrollWidth) {
				sideMenu.stop(false, true).animate({
					marginLeft: -check
				}, {
					duration: 400
				})
			}
			else {
				sideMenu.stop(false, true).animate({
					marginLeft: 0
				}, {
					duration: 400
				})
			}
		}
		else {
			if (marginRightValue > -check == false && menuWidth?.offsetWidth < menuItems.scrollWidth) {
				sideMenu.stop(false, true).animate({
					marginRight: -check
				}, {
					duration: 400
				})
			}
			else {
				sideMenu.stop(false, true).animate({
					marginRight: 0
				}, {
					duration: 400
				})
			}
		}
		checkHoriMenu();
		responsive();
		HorizontalHovermenu();


		prevWidth.push(window.innerWidth)
		if (prevWidth.length > 3) {
			prevWidth.shift()
		}
		let prevValue = prevWidth[prevWidth.length - 2];
		if (window.innerWidth >= 992 && prevValue < 992) {
			if (document.querySelector('body').classList.contains('horizontal')) {
				var animationSpeed = 300;
				// first level
				var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
				var ul = parent.find('ul:visible').slideUp(animationSpeed);
				ul.removeClass('open');
				var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
				var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
				ul1.removeClass('open');
			}
		}
		else {
			ActiveSubmenu()
		}
	}
)

function ActiveSubmenu() {

	var position = window.location.pathname.split('/');
	$(".side-menu li a").each(function () {
		var $this = $(this);
		var pageUrl = $this.attr("href");
		setTimeout(() => {
			if (window.innerWidth < 992 || document.querySelector('body').classList.contains('horizontal') != true) {
				if (pageUrl) {
					if (position[position.length - 1] == pageUrl) {
						$(this).addClass("active");
						$(this).parent().addClass("is-expanded");
						$(this).parent().parent().prev().addClass("active");
						$(this).parent().parent().addClass("open");
						$(this).parent().parent().prev().addClass("is-expanded");
						$(this).parent().parent().parent().addClass("is-expanded");
						$(this).parent().parent().parent().parent().addClass("open");
						$(this).parent().parent().parent().parent().prev().addClass("active");
						$(this).parent().parent().parent().parent().parent().addClass("is-expanded");
						$(this).next().slideDown(300, function () { });
						$(this).parent().parent().slideDown(300, function () {
							$(this).parent().parent().addClass("open");
						});
						$(this).parent().parent().parent().parent().slideDown(300, function () {
							$(this).parent().parent().parent().parent().addClass("open");
						});
						return false;
					}
				}
			}
		}, 100);
	});
}

function checkHoriMenu() {

	let menuWidth = document.querySelector('.horizontal-main')
	let menuItems = document.querySelector('.side-menu')
	let mainSidemenuWidth = document.querySelector('.main-sidemenu')
	let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth
	let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]);
	let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]);
	let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;

	if ($('body').hasClass('ltr')) {
		menuItems.style.marginRight = 0
	}
	else {
		menuItems.style.marginLeft = 0;
	}

	setTimeout(() => {
		if (menuItems.scrollWidth - 2 < (menuWidth?.offsetWidth - menuContainerWidth)) {
			$("#slide-right").addClass("d-none");
			$("#slide-left").addClass("d-none");
		}
		else if (marginLeftValue != 0) {
			$("#slide-left").removeClass("d-none");
		}
		else if (marginLeftValue != -check) {
			$("#slide-right").removeClass("d-none");
		}
		else if (marginRightValue != 0) {
			$("#slide-left").removeClass("d-none");
		}
		else if (marginRightValue != -check) {
			$("#slide-right").removeClass("d-none");
		}

		if (marginLeftValue == 0 || marginRightValue == 0) {
			$("#slide-left").addClass("d-none");
			$("#slide-right").removeClass("d-none");
		}
	}, 200)

}
checkHoriMenu();
$(document).on("click", ".ltr #slide-left", function () {
	let menuWidth = document.querySelector('.horizontal-main')
	let menuItems = document.querySelector('.side-menu')
	let mainSidemenuWidth = document.querySelector('.main-sidemenu')
	let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth
	let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]) + 100;

	if (marginLeftValue < 0) {
		sideMenu.stop(false, true).animate({
			// marginRight : 0,
			marginLeft: "+=" + slide
		}, {
			duration: 400
		})
		if ((menuWidth?.offsetWidth - menuContainerWidth) < menuItems.scrollWidth) {
			$("#slide-right").removeClass("d-none");
		}
	}
	else {
		$("#slide-left").addClass("d-none");
	}

	if (marginLeftValue >= 0) {
		sideMenu.stop(false, true).animate({
			// marginRight : 0,
			marginLeft: 0
		}, {
			duration: 400
		})

		if (menuWidth?.offsetWidth < menuItems.scrollWidth) {
			// $("#slide-left").addClass("d-none");
		}
	}
	// to remove dropdown when clicking arrows in horizontal menu
	let subNavSub = document.querySelectorAll('.sub-nav-sub');
	subNavSub.forEach((e) => {
		e.style.display = '';
	})
	let subNav = document.querySelectorAll('.nav-sub')
	subNav.forEach((e) => {
		e.style.display = '';
	})
	//
});
$(document).on("click", ".ltr #slide-right", function () {
	let menuWidth = document.querySelector('.app-sidebar')
	let menuItems = document.querySelector('.side-menu')
	let mainSidemenuWidth = document.querySelector('.main-sidemenu')
	let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth
	let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]) - 100;
	let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
	if (marginLeftValue > -check) {
		sideMenu.stop(false, true).animate({
			// marginLeft : 0,
			marginLeft: "-=" + slide,
			marginRight: 0,
		}, {
			duration: 400
		})
	}
	else {
		sideMenu.stop(false, true).animate({
			// marginLeft : 0,
			marginRight: 0,
			marginLeft: -check
		}, {
			duration: 400
		});

		$("#slide-right").addClass("d-none");
	}
	if (marginLeftValue != 0) {
		$("#slide-left").removeClass("d-none");
	}
	// to remove dropdown when clicking arrows in horizontal menu
	let subNavSub = document.querySelectorAll('.sub-nav-sub');
	subNavSub.forEach((e) => {
		e.style.display = '';
	})
	let subNav = document.querySelectorAll('.nav-sub')
	subNav.forEach((e) => {
		e.style.display = '';
	})
	//
});

$(document).on("click", ".rtl #slide-left", function () {
	let menuWidth = document.querySelector('.horizontal-main')
	let menuItems = document.querySelector('.side-menu')
	let mainSidemenuWidth = document.querySelector('.main-sidemenu')
	let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth
	let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]) + 100;

	if (marginRightValue < 0) {
		sideMenu.stop(false, true).animate({
			// marginRight : 0,
			marginLeft: 0,
			marginRight: "+=" + slide
		}, {
			duration: 400
		})
		if ((menuWidth?.offsetWidth - menuContainerWidth) < menuItems.scrollWidth) {
			$("#slide-right").removeClass("d-none");
		}
	}
	else {
		$("#slide-left").addClass("d-none");
	}

	if (marginRightValue >= 0) {
		$("#slide-left").addClass("d-none");
		sideMenu.stop(false, true).animate({
			// marginRight : 0,
			marginLeft: 0
		}, {
			duration: 400
		})
	}
	// to remove dropdown when clicking arrows in horizontal menu
	let subNavSub = document.querySelectorAll('.sub-nav-sub');
	subNavSub.forEach((e) => {
		e.style.display = '';
	})
	let subNav = document.querySelectorAll('.nav-sub')
	subNav.forEach((e) => {
		e.style.display = '';
	})
	//
});
$(document).on("click", ".rtl #slide-right", function () {
	let menuWidth = document.querySelector('.app-sidebar')
	let menuItems = document.querySelector('.side-menu')
	let mainSidemenuWidth = document.querySelector('.main-sidemenu')
	let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth
	let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]) - 100;
	let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
	if (marginRightValue > -check) {
		sideMenu.stop(false, true).animate({
			// marginLeft : 0,
			marginLeft: 0,
			marginRight: "-=" + slide
		}, {
			duration: 400
		})

	}
	else {
		sideMenu.stop(false, true).animate({
			// marginLeft : 0,
			marginLeft: 0,
			marginRight: -check
		}, {
			duration: 400
		})
		$("#slide-right").addClass("d-none");
	}

	if (marginRightValue != 0) {
		$("#slide-left").removeClass("d-none");
	}
	// to remove dropdown when clicking arrows in horizontal menu
	let subNavSub = document.querySelectorAll('.sub-nav-sub');
	subNavSub.forEach((e) => {
		e.style.display = '';
	})
	let subNav = document.querySelectorAll('.nav-sub')
	subNav.forEach((e) => {
		e.style.display = '';
	})
});


function menuClick() {
	$("[data-bs-toggle='slide']").off('click');
	$("[data-bs-toggle='sub-slide']").off('click')
	$("[data-bs-toggle='sub-slide2']").off('click')
	$("[data-bs-toggle='slide']").on('click', function (e) {
		var $this = $(this);
		var checkElement = $this.next();
		var animationSpeed = 300,
			slideMenuSelector = '.slide-menu';
		if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
			checkElement.slideUp(animationSpeed, function () {
				checkElement.removeClass('open');
			});
			checkElement.parent("li").removeClass("is-expanded");
		}
		else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
			var parent = $this.parents('ul').first();
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent_li = $this.parent("li");
			checkElement.slideDown(animationSpeed, function () {
				checkElement.addClass('open');
				parent.find('li.is-expanded').removeClass('is-expanded');
				parent_li.addClass('is-expanded');
			});
		}
		if (checkElement.is(slideMenuSelector)) {
			e.preventDefault();
		}
	});
	// Activate sidebar slide toggle	
	$("[data-bs-toggle='sub-slide']").on('click', function (e) {
		var $this = $(this);
		var checkElement = $this.next();
		var animationSpeed = 300,
			slideMenuSelector = '.sub-slide-menu';
		if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
			checkElement.slideUp(animationSpeed, function () {
				checkElement.removeClass('open');
			});
			checkElement.parent("li").removeClass("is-expanded");
		}
		else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
			var parent = $this.parents('ul').first();
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent_li = $this.parent("li");
			checkElement.slideDown(animationSpeed, function () {
				checkElement.addClass('open');
				parent.find('li.is-expanded').removeClass('is-expanded');
				parent_li.addClass('is-expanded');
			});
		}
		if (checkElement.is(slideMenuSelector)) {
			e.preventDefault();
		}
	});
	// Activate sidebar slide toggle	
	$("[data-bs-toggle='sub-slide2']").on('click', function (e) {
		var $this = $(this);
		var checkElement = $this.next();
		var animationSpeed = 300,
			slideMenuSelector = '.sub-slide-menu1';
		if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
			checkElement.slideUp(animationSpeed, function () {
				checkElement.removeClass('open');
			});
			checkElement.parent("li").removeClass("is-expanded");
		}
		else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
			var parent = $this.parents('ul').first();
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent_li = $this.parent("li");
			checkElement.slideDown(animationSpeed, function () {
				checkElement.addClass('open');
				parent.find('li.is-expanded').removeClass('is-expanded');
				parent_li.addClass('is-expanded');
			});
		}
		if (checkElement.is(slideMenuSelector)) {
			e.preventDefault();
		}
	});
}
function HorizontalHovermenu() {
	let value = document.querySelector('body').classList.contains('horizontal-hover')
	if (value && window.innerWidth >= 992) {
		$("[data-bs-toggle='slide']").off('click');
		$("[data-bs-toggle='sub-slide']").off('click')
		$("[data-bs-toggle='sub-slide2']").off('click')
		slideClick()
	}
	else {
		menuClick();
	}
}
HorizontalHovermenu();
// for Icon-text Menu	
//icontext(); 	
// default layout	
hovermenu();





$(function () {
	$('#example1').DataTable({
		language: {
			searchPlaceholder: 'Search...',
			sSearch: '',
			lengthMenu: '_MENU_',
		}
	});
});


$(function () {
	'use strict'

	// ______________LOADER
	$("#global-loader").fadeOut("slow");

	//Color-Theme
	$(document).on("click", "a[data-theme]", function () {
		$("head link#theme").attr("href", $(this).data("theme"));
		$(this).toggleClass('active').siblings().removeClass('active');
	});


	// This template is mobile first so active menu in navbar
	// has submenu displayed by default but not in desktop
	// so the code below will hide the active menu if it's in desktop


	// ______________Full screen
	$(document).on("click", ".fullscreen-button", function toggleFullScreen() {
		$('html').addClass('fullscreen-button');
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			$('html').removeClass('fullscreen-button');
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	})


	// ______________Cover Image
	$(".cover-image").each(function () {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});

	// ______________ PAGE LOADING
	$(window).on("load", function (e) {
		$("#global-loader").fadeOut("slow");
	})

	// ______________ BACK TO TOP BUTTON
	$(window).on("scroll", function (e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$(document).on("click", "#back-to-top", function (e) {
		$("html").animate({
			scrollTop: 0
		}, 0);
		return false;
	});

	// ______________Toast
	$(".toast").toast();

	/* Headerfixed */
	$(window).on("scroll", function (e) {
		if ($(window).scrollTop() >= 66) {
			$('main-header').addClass('fixed-header');
		}
		else {
			$('.main-header').removeClass('fixed-header');
		}
	});

	// ______________Search
	$('body, .main-header form[role="search"] button[type="reset"]').on('click keyup', function (event) {
		if (event.which == 27 && $('.main-header form[role="search"]').hasClass('active') ||
			$(event.currentTarget).attr('type') == 'reset') {
			closeSearch();
		}
	});
	function closeSearch() {
		var $form = $(' form[role="search"].active')
		$form.find('input').val('');
		$form.removeClass('active');
		$('body').removeClass('search-open');
	}
	// Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
	$(document).on('click', ' form[role="search"]:not(.active) button[type="submit"]', function (event) {
		event.preventDefault();
		var $form = $(this).closest('form'),
			$input = $form.find('input');
		$form.addClass('active');
		$input.focus();
		$('body').addClass('search-open');
	});
	// if your form is ajax remember to call `closeSearch()` to close the search container
	$(document).on('click', ' form[role="search"].active button[type="submit"]', function (event) {
		event.preventDefault();
		var $form = $(this).closest('form'),
			$input = $form.find('input');
		$('#showSearchTerm').text($input.val());
		closeSearch()
		$('body').addClass('search-open');
	});

	// if your form is ajax remember to call `closeSearch()` to close the search container
	$(document).on('click', ' form[role="search"].active button[type="reset"]', function (event) {
		event.preventDefault();
		$('body').removeClass('search-open');
		var $form = $(this).closest('form'),
			$input = $form.find('input');
		$('#showSearchTerm').text($input.val());
		closeSearch()
	});

	//  item notes
	$('.thumb').click(function () {
		if (!$(this).hasClass('active')) {
			$(".thumb.active").removeClass("active");
			$(this).addClass("active");
		}
	});

	const DIV_CARD = 'div.card';

	// ______________ Function for remove card
	$(document).on('click', '[data-bs-toggle="card-remove"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});
	// ______________ Functions for collapsed card
	$(document).on('click', '[data-bs-toggle="card-collapse"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________ Card full screen
	$(document).on('click', '[data-bs-toggle="card-fullscreen"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	/* ----------------------------------- */

	// Showing submenu in navbar while hiding previous open submenu
	$('.main-navbar .with-sub').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	});
	// this will hide dropdown menu from open in mobile
	$('.dropdown-menu .main-header-arrow').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.dropdown').removeClass('show');
	});
	// this will show navbar in left for mobile only
	$('#mainNavShow, #azNavbarShow').on('click', function (e) {
		e.preventDefault();
		$('body').addClass('main-navbar-show');
	});
	// this will hide currently open content of page
	// only works for mobile
	$('#mainContentLeftShow').on('click touch', function (e) {
		e.preventDefault();
		$('body').addClass('main-content-left-show');
	});
	// This will hide left content from showing up in mobile only
	$('#mainContentLeftHide').on('click touch', function (e) {
		e.preventDefault();
		$('body').removeClass('main-content-left-show');
	});
	// this will hide content body from showing up in mobile only
	$('#mainContentBodyHide').on('click touch', function (e) {
		e.preventDefault();
		$('body').removeClass('main-content-body-show');
	})
	// navbar backdrop for mobile only
	$('body').append('<div class="main-navbar-backdrop"></div>');
	$('.main-navbar-backdrop').on('click touchstart', function () {
		$('body').removeClass('main-navbar-show');
	});
	// Close dropdown menu of header menu
	$(document).on('click touchstart', function (e) {
		e.stopPropagation();
		// closing of dropdown menu in header when clicking outside of it
		var dropTarg = $(e.target).closest('.main-header .dropdown').length;
		if (!dropTarg) {
			$('.main-header .dropdown').removeClass('show');
		}
		// closing nav sub menu of header when clicking outside of it
		if (window.matchMedia('(min-width: 992px)').matches) {
			// Navbar
			var navTarg = $(e.target).closest('.main-navbar .nav-item').length;
			if (!navTarg) {
				$('.main-navbar .show').removeClass('show');
			}
			// Header Menu
			var menuTarg = $(e.target).closest('.main-header-menu .nav-item').length;
			if (!menuTarg) {
				$('.main-header-menu .show').removeClass('show');
			}
			if ($(e.target).hasClass('main-menu-sub-mega')) {
				$('.main-header-menu .show').removeClass('show');
			}
		} else {
			//
			if (!$(e.target).closest('#mainMenuShow').length) {
				var hm = $(e.target).closest('.main-header-menu').length;
				if (!hm) {
					$('body').removeClass('main-header-menu-show');
				}
			}
		}
	});
	$('#mainMenuShow').on('click', function (e) {
		e.preventDefault();
		$('body').toggleClass('main-header-menu-show');
	})
	$('.main-header-menu .with-sub').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	})
	$('.main-header-menu-header .close').on('click', function (e) {
		e.preventDefault();
		$('body').removeClass('main-header-menu-show');
	})

	$(".card-header-right .card-option .fe fe-chevron-left").on("click", function () {
		var a = $(this);
		if (a.hasClass("icofont-simple-right")) {
			a.parents(".card-option").animate({
				width: "35px",
			})
		} else {
			a.parents(".card-option").animate({
				width: "180px",
			})
		}
		$(this).toggleClass("fe fe-chevron-right").fadeIn("slow")
	});

	// ___________TOOLTIP	
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	// __________POPOVER
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl)
	})



	// ______________horizontal-menu Active Class
	$(".horizontalMenu-list li a").each(function () {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	$(".horizontalMenu-list li a").each(function () {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	$(".horizontal-megamenu li a").each(function () {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().parent().parent().parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	$(".horizontalMenu-list .sub-menu .sub-menu li a").each(function () {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});



	// ______________Cover Image
	$(".cover-image").each(function () {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});

	// ______________ SWITCHER-toggle ______________//

	$('.layout-setting').on("click", function (e) {
		if (!(document.querySelector('body').classList.contains('dark-theme'))) {
			$('body').addClass('dark-theme');
			$('body').removeClass('light-theme');
			$('body').removeClass('transparent-theme');

			$('#myonoffswitch5').prop('checked', true);
			$('#myonoffswitch8').prop('checked', true);

			localStorage.setItem('nowadarkMode', true);
			localStorage.removeItem('nowalightMode');
			localStorage.removeItem('nowatransparentMode');
			$('#myonoffswitch2').prop('checked', true);

		} else {
			$('body').removeClass('dark-theme');
			$('body').addClass('light-theme');
			$('#myonoffswitch3').prop('checked', true);
			$('#myonoffswitch6').prop('checked', true);

			localStorage.setItem('nowalightMode', true);
			localStorage.removeItem('nowatransparentMode');
			localStorage.removeItem('nowadarkMode');
			$('#myonoffswitch1').prop('checked', true);
		}
	});



	$('.default-menu').on('click', function () {
		var ww = document.body.clientWidth;
		if (ww >= 992) {
			$('body').removeClass('sidenav-toggled');
		}
	});


	/*Light Layout Start*/

	$(document).on("click", '#myonoffswitch1', function () {
		if (this.checked) {
			$('body').addClass('light-theme');
			$('#myonoffswitch3').prop('checked', true);
			$('#myonoffswitch6').prop('checked', true);
			$('body').removeClass('dark-theme');
			$('body').removeClass('transparent-theme');
			$('body').removeClass('light-menu');
			$('body').removeClass('dark-theme');
			$('body').removeClass('color-header');
			$('body').removeClass('dark-header');
			$('body').removeClass('dark-menu');
			$('body').removeClass('gradient-menu');
			$('body').removeClass('gradient-header');
			$('body').removeClass('color-menu');
			localStorage.removeItem('nowadarkPrimary')

			// remove light theme properties
			localStorage.removeItem('nowaprimaryColor')
			localStorage.removeItem('nowaprimaryHoverColor')
			localStorage.removeItem('nowaprimaryBorderColor')
			localStorage.removeItem('nowatransparentBgImgPrimary')
			localStorage.removeItem('nowatransparentBgImgprimaryTransparent')
			document.querySelector('html')?.style.removeProperty('--primary-bg-color', localStorage.darkPrimary);
			document.querySelector('html')?.style.removeProperty('--primary-bg-hover', localStorage.darkPrimary);
			document.querySelector('html')?.style.removeProperty('--primary-bg-border', localStorage.darkPrimary);
			document.querySelector('html')?.style.removeProperty('--dark-primary', localStorage.darkPrimary);

			// removing dark theme properties
			localStorage.removeItem('nowadarkPrimary')
			localStorage.removeItem('nowadarkprimaryTransparent');
			localStorage.removeItem('nowatransparentBgColor');
			localStorage.removeItem('nowatransparentThemeColor');
			localStorage.removeItem('nowatransparentPrimary');

			$('#myonoffswitch5').prop('checked', false);
			$('#myonoffswitch8').prop('checked', false);
			$('#myonoffswitchTransparent').prop('checked', false);

			checkOptions();
			const root = document.querySelector(':root');
			root.style = "";
			names()
		} else {
			$('body').removeClass('light-theme');
			localStorage.removeItem("nowalight-theme");
		}
		localStorageBackup();
	});

	/*Light Layout End*/

	/*Dark Layout Start*/

	$(document).on("click", '#myonoffswitch2', function () {
		if (this.checked) {
			$('body').addClass('dark-theme');
			$('#myonoffswitch5').prop('checked', true);
			$('#myonoffswitch8').prop('checked', true);
			$('body').removeClass('light-theme');
			$('body').removeClass('transparent-theme');
			$('body').removeClass('light-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('gradient-menu');
			$('body').removeClass('dark-menu');
			$('body').removeClass('dark-header');
			$('body').removeClass('color-header');
			$('body').removeClass('light-header');


			// remove light theme properties
			localStorage.removeItem('nowaprimaryColor')
			localStorage.removeItem('nowaprimaryHoverColor')
			localStorage.removeItem('nowaprimaryBorderColor')
			localStorage.removeItem('nowadarkPrimary')
			localStorage.removeItem('nowatransparentBgImgPrimary')
			localStorage.removeItem('nowatransparentBgImgprimaryTransparent')
			document.querySelector('html')?.style.removeProperty('--primary-bg-color', localStorage.darkPrimary);
			document.querySelector('html')?.style.removeProperty('--primary-bg-hover', localStorage.darkPrimary);
			document.querySelector('html')?.style.removeProperty('--primary-bg-border', localStorage.darkPrimary);
			document.querySelector('html')?.style.removeProperty('--dark-primary', localStorage.darkPrimary);

			// removing light theme data 
			localStorage.removeItem('nowaprimaryColor')
			localStorage.removeItem('nowaprimaryHoverColor')
			localStorage.removeItem('nowaprimaryBorderColor')
			localStorage.removeItem('nowaprimaryTransparent');

			localStorage.removeItem('nowatransparentBgColor');
			localStorage.removeItem('nowatransparentThemeColor');
			localStorage.removeItem('nowatransparentPrimary');

			$('#myonoffswitch3').prop('checked', false);
			$('#myonoffswitch6').prop('checked', false);
			$('#myonoffswitchTransparent').prop('checked', false);
			//
			checkOptions();

			const root = document.querySelector(':root');
			root.style = "";
			names()
		} else {
			$('body').removeClass('dark-theme');
			localStorage.removeItem("nowadark-theme");
		}
		localStorageBackup()
	});

	/*Dark Layout End*/


	/*Transparent Layout Start*/

	$(document).on("click", '#myonoffswitchTransparent', function () {
		if (this.checked) {
			$('body').addClass('transparent-theme');
			$('#myonoffswitch3').prop('checked', false);
			$('#myonoffswitch6').prop('checked', false);
			$('#myonoffswitch5').prop('checked', false);
			$('#myonoffswitch8').prop('checked', false);
			$('body').removeClass('dark-theme');
			$('body').removeClass('light-theme');
			// remove light theme properties
			localStorage.removeItem('nowaprimaryColor')
			localStorage.removeItem('nowaprimaryHoverColor')
			localStorage.removeItem('nowaprimaryBorderColor')

			// reseting the menu and header switcher

			document.querySelector('.lightMenu')?.classList.remove('d-none')
			document.querySelector('.lightMenu')?.classList.add('d-flex')
			document.querySelector('.lightHeader')?.classList.remove('d-none')
			document.querySelector('.lightHeader')?.classList.add('d-flex')

			document.querySelector('.darkMenu')?.classList.remove('d-none')
			document.querySelector('.darkMenu')?.classList.add('d-flex')
			document.querySelector('.darkHeader')?.classList.remove('d-none')
			document.querySelector('.darkHeader')?.classList.add('d-flex')

			// removing light theme data 
			localStorage.removeItem('nowadarkPrimary');
			localStorage.removeItem('nowaprimaryColor')
			localStorage.removeItem('nowaprimaryHoverColor')
			localStorage.removeItem('nowaprimaryBorderColor')
			localStorage.removeItem('nowaprimaryTransparent');
			localStorage.removeItem('nowatransparentPrimary');
			localStorage.removeItem('nowadarkprimaryTransparent');
			localStorage.removeItem('nowatransparentBgImgPrimary')
			localStorage.removeItem('nowatransparentBgImgprimaryTransparent')

			$('#myonoffswitch2').prop('checked', false);
			$('#myonoffswitch1').prop('checked', false);
			$('#myonoffswitchTransparent').prop('checked', true);
			//
			checkOptions();
			removeForTransparent();
			const root = document.querySelector(':root');
			root.style = "";
			names()
		} else {
			$('body').removeClass('transparent-theme');
			localStorage.removeItem("nowatransparent-theme");
		}
		localStorageBackup()
		$('body').removeClass('bg-img1');
		$('body').removeClass('bg-img2');
		$('body').removeClass('bg-img3');
		$('body').removeClass('bg-img4');
	});

	/*Transparent Layout End*/

	/*Transparent Bg-Image Style Start*/
	$(document).on("click", '#bgimage1', function () {
		$('body').addClass('bg-img1');
		$('body').removeClass('bg-img2');
		$('body').removeClass('bg-img3');
		$('body').removeClass('bg-img4');
		$('body').removeClass('light-menu');
		$('body').removeClass('color-menu');
		$('body').removeClass('gradient-menu');
		$('body').removeClass('dark-menu');
		$('body').removeClass('dark-header');
		$('body').removeClass('color-header');
		$('body').removeClass('light-header');
		$('body').removeClass('gradient-header');

		document.querySelector('body').classList.add('transparent-theme');
		document.querySelector('body')?.classList.remove('light-theme');
		document.querySelector('body')?.classList.remove('dark-theme');

		$('#myonoffswitch2').prop('checked', false);
		$('#myonoffswitch1').prop('checked', false);
		$('#myonoffswitchTransparent').prop('checked', true);
		checkOptions();
		removeForTransparent();
	})

	$(document).on("click", '#bgimage2', function () {
		$('body').addClass('bg-img2');
		$('body').removeClass('bg-img1');
		$('body').removeClass('bg-img3');
		$('body').removeClass('bg-img4');
		$('body').removeClass('light-menu');
		$('body').removeClass('color-menu');
		$('body').removeClass('gradient-menu');
		$('body').removeClass('dark-menu');
		$('body').removeClass('dark-header');
		$('body').removeClass('color-header');
		$('body').removeClass('light-header');
		$('body').removeClass('gradient-header');

		document.querySelector('body').classList.add('transparent-theme');
		document.querySelector('body')?.classList.remove('light-theme');
		document.querySelector('body')?.classList.remove('dark-theme');

		$('#myonoffswitch2').prop('checked', false);
		$('#myonoffswitch1').prop('checked', false);
		$('#myonoffswitchTransparent').prop('checked', true);
		checkOptions();
		removeForTransparent();
	})

	$(document).on("click", '#bgimage3', function () {
		$('body').addClass('bg-img3');
		$('body').removeClass('bg-img1');
		$('body').removeClass('bg-img2');
		$('body').removeClass('bg-img4');
		$('body').removeClass('light-menu');
		$('body').removeClass('color-menu');
		$('body').removeClass('gradient-menu');
		$('body').removeClass('dark-menu');
		$('body').removeClass('dark-header');
		$('body').removeClass('color-header');
		$('body').removeClass('light-header');
		$('body').removeClass('gradient-header');

		document.querySelector('body').classList.add('transparent-theme');
		document.querySelector('body')?.classList.remove('light-theme');
		document.querySelector('body')?.classList.remove('dark-theme');

		$('#myonoffswitch2').prop('checked', false);
		$('#myonoffswitch1').prop('checked', false);
		$('#myonoffswitchTransparent').prop('checked', true);
		checkOptions();
		removeForTransparent();
	})

	$(document).on("click", '#bgimage4', function () {
		$('body').addClass('bg-img4');
		$('body').removeClass('bg-img1');
		$('body').removeClass('bg-img2');
		$('body').removeClass('bg-img3');
		$('body').removeClass('light-menu');
		$('body').removeClass('color-menu');
		$('body').removeClass('gradient-menu');
		$('body').removeClass('dark-menu');
		$('body').removeClass('dark-header');
		$('body').removeClass('color-header');
		$('body').removeClass('light-header');
		$('body').removeClass('gradient-header');

		document.querySelector('body').classList.add('transparent-theme');
		document.querySelector('body')?.classList.remove('light-theme');
		document.querySelector('body')?.classList.remove('dark-theme');
		$('#myonoffswitch2').prop('checked', false);
		$('#myonoffswitch1').prop('checked', false);
		$('#myonoffswitchTransparent').prop('checked', true);
		checkOptions();
		removeForTransparent();
	})
	/*Transparent Bg-Image Style End*/

	/*Light Menu Start*/
	$(document).on("click", '#myonoffswitch3', function () {
		if (this.checked) {
			$('body').addClass('light-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
			$('body').removeClass('gradient-menu');
			localStorage.setItem("nowalight-menu", "True");
		} else {
			$('body').removeClass('light-menu');
			localStorage.setItem("nowalight-menu", "false");
		}
	});
	/*Light Menu End*/

	/*Color Menu Start*/
	$(document).on("click", '#myonoffswitch4', function () {
		if (this.checked) {
			$('body').addClass('color-menu');
			$('body').removeClass('light-menu');
			$('body').removeClass('dark-menu');
			$('body').removeClass('gradient-menu');
			localStorage.setItem("nowacolor-menu", "True");
		} else {
			$('body').removeClass('color-menu');
			localStorage.setItem("nowacolor-menu", "false");
		}
	});
	/*Color Menu End*/

	/*Dark Menu Start*/
	$(document).on("click", '#myonoffswitch5', function () {
		if (this.checked) {
			$('body').addClass('dark-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('light-menu');
			$('body').removeClass('gradient-menu');
			localStorage.setItem("nowadark-menu", "True");
		} else {
			$('body').removeClass('dark-menu');
			localStorage.setItem("nowadark-menu", "false");
		}
	});
	/*Dark Menu End*/

	/*Gradient Menu Start*/
	$(document).on("click", '#myonoffswitch25', function () {
		if (this.checked) {
			$('body').addClass('gradient-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('light-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("nowagradient-menu", "True");
		} else {
			$('body').removeClass('gradient-menu');
			localStorage.setItem("nowagradient-menu", "false");
		}
	});
	/*Gradient Menu End*/

	/*Light Header Start*/
	$(document).on("click", '#myonoffswitch6', function () {
		if (this.checked) {
			$('body').addClass('light-header');
			$('body').removeClass('color-header');
			$('body').removeClass('dark-header');
			$('body').removeClass('gradient-header');
			localStorage.setItem("nowalight-header", "True");
		} else {
			$('body').removeClass('light-header');
			localStorage.setItem("nowalight-header", "false");
		}
	});
	/*Light Header End*/

	/*Color Header Start*/
	$(document).on("click", '#myonoffswitch7', function () {
		if (this.checked) {
			$('body').addClass('color-header');
			$('body').removeClass('light-header');
			$('body').removeClass('dark-header');
			$('body').removeClass('gradient-header');
			localStorage.setItem("nowacolor-header", "True");
		} else {
			$('body').removeClass('color-header');
			localStorage.setItem("nowacolor-header", "false");
		}
	});
	/*Color Header End*/

	/*Dark Header Start*/
	$(document).on("click", '#myonoffswitch8', function () {
		if (this.checked) {
			$('body').addClass('dark-header');
			$('body').removeClass('color-header');
			$('body').removeClass('light-header');
			$('body').removeClass('gradient-header');
			localStorage.setItem("nowadark-header", "True");
		} else {
			$('body').removeClass('dark-header');
			localStorage.setItem("nowadark-header", "false");
		}
	});
	/*Dark Header End*/

	/*Gradient Header Start*/
	$(document).on("click", '#myonoffswitch26', function () {
		if (this.checked) {
			$('body').addClass('gradient-header');
			$('body').removeClass('dark-header');
			$('body').removeClass('color-header');
			$('body').removeClass('light-header');
			localStorage.setItem("nowagradient-header", "True");
		} else {
			$('body').removeClass('gradient-header');
			localStorage.setItem("nowagradient-header", "false");
		}
	});
	/*Gradient Header End*/

	/*Full Width Layout Start*/
	$(document).on("click", '#myonoffswitch9', function () {
		if (this.checked) {
			$('body').addClass('layout-fullwidth');
			checkHoriMenu();
			$('body').removeClass('layout-boxed');
			localStorage.setItem("nowalayout-fullwidth", "True");
		} else {
			$('body').removeClass('layout-fullwidth');
			localStorage.setItem("nowalayout-fullwidth", "false");
		}
	});
	/*Full Width Layout End*/

	/*Boxed Layout Start*/
	$(document).on("click", '#myonoffswitch10', function () {
		if (this.checked) {
			$('body').addClass('layout-boxed');
			checkHoriMenu();
			$('body').removeClass('layout-fullwidth');
			localStorage.setItem("nowalayout-boxed", "True");
		} else {
			$('body').removeClass('layout-boxed');
			localStorage.setItem("nowalayout-boxed", "false");
		}
	});
	/*Boxed Layout End*/

	/*Header-Position Styles Start*/
	$(document).on("click", '#myonoffswitch11', function () {
		if (this.checked) {
			$('body').addClass('fixed-layout');
			$('body').removeClass('scrollable-layout');
			localStorage.setItem("nowafixed-layout", "True");
		} else {
			$('body').removeClass('fixed-layout');
			localStorage.setItem("nowafixed-layout", "false");
		}
	});
	$(document).on("click", '#myonoffswitch12', function () {
		if (this.checked) {
			$('body').addClass('scrollable-layout');
			$('body').removeClass('fixed-layout');
			localStorage.setItem("nowascrollable-layout", "True");
		} else {
			$('body').removeClass('scrollable-layout');
			localStorage.setItem("nowascrollable-layout", "false");
		}
	});
	/*Header-Position Styles End*/


	/*Default Sidemenu Start*/
	$(document).on("click", '#myonoffswitch13', function () {
		if (this.checked) {
			$('body').addClass('default-menu');
			hovermenu();
			$('body').removeClass('closed-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
		} else {
			$('body').removeClass('default-menu');
		}
	});
	/*Default Sidemenu End*/


	/*Closed Sidemenu Start*/
	$(document).on("click", '#myonoffswitch30', function () {
		if (this.checked) {
			$('body').addClass('closed-menu');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
		} else {
			$('body').removeClass('default-menu');
			$('body').removeClass('sidenav-toggled');
		}
	});
	/*Closed Sidemenu End*/


	/*Hover Submenu Start*/
	$(document).on("click", '#myonoffswitch32', function () {
		if (this.checked) {
			$('body').addClass('hover-submenu');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu1');
		} else {
			$('body').removeClass('hover-submenu');
			$('body').removeClass('sidenav-toggled');
		}
	});
	/*Hover Submenu End*/

	/*Hover Submenu 1 Start*/
	$(document).on("click", '#myonoffswitch33', function () {
		if (this.checked) {
			$('body').addClass('hover-submenu1');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
		} else {
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('sidenav-toggled');
		}
	});
	/*Hover Submenu 1 End*/


	/*Icon Text Sidemenu Start*/
	$(document).on("click", '#myonoffswitch14', function () {
		if (this.checked) {
			$('body').addClass('icontext-menu');
			icontext();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');

		} else {
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sidenav-toggled');
		}
	});
	/*Icon Text Sidemenu End*/

	/*Icon Overlay Sidemenu Start*/
	$(document).on("click", '#myonoffswitch15', function () {
		if (this.checked) {
			$('body').addClass('sideicon-menu');
			hovermenu();
			$('body').addClass('sidenav-toggled');
			$('body').removeClass('default-menu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
		} else {
			$('body').removeClass('sideicon-menu');
			$('body').removeClass('sidenav-toggled');
		}
	});
	/*Icon Overlay Sidemenu End*/
	$(document).on("click", '#myonoffswitch34', function () {
		if (this.checked) {
			$('body').removeClass('horizontal');
			$('body').removeClass('horizontal-hover');
			$(".main-content").removeClass("horizontal-content");
			$(".main-content").addClass("app-content");
			$(".main-container").removeClass("container");
			$(".main-container").addClass("container-fluid");
			$(".main-header").removeClass("hor-header");
			$(".main-header").addClass("side-header");
			$(".app-sidebar").removeClass("horizontal-main")
			$(".main-sidemenu").removeClass("container")
			$('#slide-left').removeClass('d-none');
			$('#slide-right').removeClass('d-none');
			$('body').addClass('sidebar-mini');
			localStorage.setItem("nowasidebarMini", "true");
			localStorage.removeItem("nowahorizontal");
			localStorage.removeItem("nowahorizontalHover");
			menuClick();
			checkHoriMenu();
			responsive();
			ActiveSubmenu();
		} else {
			$('body').removeClass('sidebar-mini');
			localStorage.setItem("nowasidebar-mini", "False");
		}
	});

	$(document).on("click", '#myonoffswitch35', function () {
		if (this.checked) {
			let li = document.querySelectorAll('.side-menu li')
			li.forEach((e, i) => {
				e.classList.remove('is-expanded')
			})
			var animationSpeed = 300;
			// first level
			var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
			var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
			ul1.removeClass('open');

			$('body').addClass('horizontal');
			$(".main-content").addClass("horizontal-content");
			$(".main-content").removeClass("app-content");
			$(".main-container").addClass("container");
			$(".main-container").removeClass("container-fluid");
			$(".main-header").addClass("hor-header");
			$(".main-header").removeClass("side-header");
			$(".app-sidebar").addClass("horizontal-main")
			$(".main-sidemenu").addClass("container")
			$('body').removeClass('sidebar-mini');
			$('body').removeClass('sidenav-toggled');
			$('#slide-left').removeClass('d-none');
			$('#slide-right').removeClass('d-none');
			$('body').removeClass('horizontal-hover');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');
			localStorage.setItem("nowahorizontal", "true");
			localStorage.removeItem("nowasidebarMini");
			localStorage.removeItem("nowahorizontalHover");
			document.querySelector('.horizontal .side-menu').style.flexWrap = 'noWrap'
			menuClick();
			checkHoriMenu();
			responsive();
			ActiveSubmenu();
		} else {
			$('body').removeClass('horizontal');
			localStorage.setItem("nowahorizontal", "False");
		}
	});

	$(document).on("click", '#myonoffswitch111', function () {
		if (this.checked) {
			let li = document.querySelectorAll('.side-menu li')
			li.forEach((e, i) => {
				e.classList.remove('is-expanded')
			})
			var animationSpeed = 300;
			// first level
			var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
			var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
			ul1.removeClass('open');
			// let dd = document.querySelectorAll('.sub-slide-menu');
			// dd.forEach((e,i)=>{
			// 	let eVal = e.classList[0]
			// 	var ul1 = $('.'+eVal).find('ul:visible').slideUp(animationSpeed);
			// 	ul1.removeClass('open');
			// })

			$('body').addClass('horizontal-hover');
			$('body').addClass('horizontal');
			let subNavSub = document.querySelectorAll('.sub-slide-menu');
			subNavSub.forEach((e) => {
				e.style.display = '';
			})
			let subNav = document.querySelectorAll('.slide-menu')
			subNav.forEach((e) => {
				e.style.display = '';
			})
			// $('#slide-left').addClass('d-none');
			// $('#slide-right').addClass('d-none');
			document.querySelector('.horizontal .side-menu').style.flexWrap = 'nowrap'
			$(".main-content").addClass("horizontal-content");
			$(".main-content").removeClass("app-content");
			$(".main-container").addClass("container");
			$(".main-container").removeClass("container-fluid");
			$(".main-header").addClass("hor-header");
			$(".main-header").removeClass("side-header");
			$(".app-sidebar").addClass("horizontal-main")
			$(".main-sidemenu").addClass("container")
			$('body').removeClass('sidebar-mini');
			$('body').removeClass('sidenav-toggled');
			$('body').removeClass('closed-menu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('sideicon-menu');

			localStorage.setItem("nowahorizontalHover", "true");
			localStorage.removeItem("nowasidebarMini");
			localStorage.removeItem("nowahorizontal");
			HorizontalHovermenu();
			checkHoriMenu();
			responsive();
			ActiveSubmenu();
		} else {
		}
	});

	$(document).on("click", '#myonoffswitch55', function () {
		if (this.checked) {
			$('body').addClass('rtl');
			$('body').removeClass('ltr');
			$("html[lang=en]").attr("dir", "rtl");
			localStorage.setItem("nowartl", "True");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style")?.setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));

			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = true; //don't know if both are necessary
				carouselData.options.rtl = true;
				$(element).trigger('refresh.owl.carousel');
			});
			localStorage.setItem('nowartl', true)
			localStorage.removeItem('nowaltr')
			if (!document.querySelector("body").classList.contains("error-page1")) {
				checkHoriMenu();
			}
		}
	});

	$(document).on("click", '#myonoffswitch54', function () {

		if (this.checked) {
			$('body').addClass('ltr');
			$('body').removeClass('rtl');
			$("html[lang=en]").attr("dir", "ltr");
			localStorage.setItem("nowaltr", "True");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style")?.setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = false; //don't know if both are necessary
				carouselData.options.rtl = false;
				$(element).trigger('refresh.owl.carousel');
			})
			if (!document.querySelector("body").classList.contains("error-page1")) {
				checkHoriMenu();
			}
			localStorage.setItem('nowaltr', true)
			localStorage.removeItem('nowartl')
		}

	});

	// For RTL //
	if ($("body").hasClass("rtl")) {
		document.querySelector('body').classList.remove('ltr')
		$("html[lang=en]").attr("dir", "rtl");
		$("head link#style").attr("href", $(this));
		(document.getElementById("style")?.setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));

		var carousel = $('.owl-carousel');
		$.each(carousel, function (index, element) {
			// element == this
			var carouselData = $(element).data('owl.carousel');
			carouselData.settings.rtl = true; //don't know if both are necessary
			carouselData.options.rtl = true;
			$(element).trigger('refresh.owl.carousel');
		});
		if (!document.querySelector("body").classList.contains("error-page1")) {
			checkHoriMenu();
		}
		$(".fc-theme-standard ").addClass("fc-direction-rtl");
		$(".fc-theme-standard ").removeClass("fc-direction-ltr");
		$(".fc-header-toolbar ").addClass("fc-toolbar-rtl");
		$(".fc-header-toolbar ").removeClass("fc-toolbar-ltr");
	}

	// For Horizontal //	
	let bodyhorizontal = $('body').hasClass('horizontal');
	if (bodyhorizontal) {

		let li = document.querySelectorAll('.side-menu li')
		li.forEach((e, i) => {
			e.classList.remove('is-expanded')
		})
		var animationSpeed = 300;
		// first level
		var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
		var ul = parent.find('ul:visible').slideUp(animationSpeed);
		ul.removeClass('open');
		var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
		var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
		ul1.removeClass('open');

		$('body').addClass('horizontal');
		$(".main-content").addClass("horizontal-content");
		$(".main-content").removeClass("app-content");
		$(".main-container").addClass("container");
		$(".main-container").removeClass("container-fluid");
		$(".main-header").addClass("hor-header");
		$(".main-header").removeClass("side-header");
		$(".app-sidebar").addClass("horizontal-main")
		$(".main-sidemenu").addClass("container")
		$('body').removeClass('sidebar-mini');
		$('#slide-left').removeClass('d-none');
		$('#slide-right').removeClass('d-none');
		if (!document.querySelector("body").classList.contains("error-page1")) {
			menuClick();
			checkHoriMenu();
			responsive();
			ActiveSubmenu();
		}
	}
	// For Horizontal //	

	// For Horizontal Hover //
	let bodyhorizontalhover = $('body').hasClass('horizontal-hover');
	if (bodyhorizontalhover) {

		let li = document.querySelectorAll('.side-menu li')
		li.forEach((e, i) => {
			e.classList.remove('is-expanded')
		})
		var animationSpeed = 300;
		// first level
		var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
		var ul = parent.find('ul:visible').slideUp(animationSpeed);
		ul.removeClass('open');
		var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
		var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
		ul1.removeClass('open');

		$('body').addClass('horizontal-hover');
		$('body').addClass('horizontal');
		$('#slide-left').addClass('d-none');
		$('#slide-right').addClass('d-none');
		$(".main-content").addClass("horizontal-content");
		$(".main-content").removeClass("app-content");
		$(".main-container").addClass("container");
		$(".main-container").removeClass("container-fluid");
		$(".main-header").addClass("hor-header");
		$(".main-header").removeClass("side-header");
		$(".app-sidebar").addClass("horizontal-main")
		$(".main-sidemenu").addClass("container")
		$('body').removeClass('sidebar-mini');
		$('body').removeClass('sidenav-toggled');
		if (!document.querySelector("body").classList.contains("error-page1")) {
			HorizontalHovermenu();
			checkHoriMenu();
			responsive();
			ActiveSubmenu();
		}
	}
	// For Horizontal Hover //	
});

function resetData() {
	'use strict'
	$('#myonoffswitch1').prop('checked', true);
	$('#myonoffswitch11').prop('checked', true);
	$('#myonoffswitch3').prop('checked', true);
	$('#myonoffswitch6').prop('checked', true);
	$('#myonoffswitch9').prop('checked', true);
	$('#myonoffswitch13').prop('checked', true);
	$('#myonoffswitch54').prop('checked', true);
	$('#myonoffswitch34').prop('checked', true);
	$('body')?.removeClass('bg-img4');
	$('body')?.removeClass('bg-img1');
	$('body')?.removeClass('bg-img2');
	$('body')?.removeClass('bg-img3');
	$('body')?.removeClass('transparent-theme');
	$('body')?.removeClass('dark-theme');
	$('body')?.removeClass('dark-menu');
	$('body')?.removeClass('light-menu');
	$('body')?.removeClass('color-menu');
	$('body')?.removeClass('dark-header');
	$('body')?.removeClass('light-header');
	$('body')?.removeClass('color-header');
	$('body')?.removeClass('layout-boxed');
	$('body')?.removeClass('icontext-menu');
	$('body')?.removeClass('sideicon-menu');
	$('body')?.removeClass('closed-menu');
	$('body')?.removeClass('hover-submenu');
	$('body')?.removeClass('hover-submenu1');
	$('body')?.removeClass('scrollable-layout');
	$('body')?.removeClass('sidenav-toggled');
	$('body')?.removeClass('rtl');
	$('body')?.addClass('ltr');
	document.querySelector('html').setAttribute("dir", "ltr");

	// resetting horizontal to vertical
	$('body').removeClass('horizontal');
	$('body').removeClass('horizontal-hover');
	$(".main-content").removeClass("horizontal-content");
	$(".main-content").addClass("app-content");
	$(".main-container").removeClass("container");
	$(".main-container").addClass("container-fluid");
	$(".main-header").removeClass("hor-header");
	$(".main-header").addClass("side-header");
	$(".app-sidebar").removeClass("horizontal-main")
	$(".main-sidemenu").removeClass("container")
	$('#slide-left').removeClass('d-none');
	$('#slide-right').removeClass('d-none');
	$('body').addClass('sidebar-mini');

	if (!document.querySelector("body").classList.contains("error-page1")) {
		menuClick();
		checkHoriMenu();
		responsive();
		ActiveSubmenu();
	}

	$("head link#style").attr("href", $(this));
	(document.getElementById("style")?.setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css"));
}

function checkOptions() {
	'use strict'

	// rtl
	if (document.querySelector('body').classList.contains('rtl')) {
		$('#myonoffswitch55').prop('checked', true);
	}
	// horizontal
	if (document.querySelector('body').classList.contains('horizontal')) {
		$('#myonoffswitch35').prop('checked', true);
	}
	// horizontal-hover
	if (document.querySelector('body').classList.contains('horizontal-hover')) {
		$('#myonoffswitch111').prop('checked', true);
	}
	// light header 
	if (document.querySelector('body').classList.contains('header-light')) {
		$('#myonoffswitch6').prop('checked', true);
	}
	// color header 
	if (document.querySelector('body').classList.contains('color-header')) {
		$('#myonoffswitch7').prop('checked', true);
	}
	// gradient header 
	if (document.querySelector('body').classList.contains('gradient-header')) {
		$('#myonoffswitch26').prop('checked', true);
	}
	// dark header 
	if (document.querySelector('body').classList.contains('dark-header')) {
		$('#myonoffswitch8').prop('checked', true);
	}

	// light menu
	if (document.querySelector('body').classList.contains('light-menu')) {
		$('#myonoffswitch3').prop('checked', true);
	}
	// color menu
	if (document.querySelector('body').classList.contains('color-menu')) {
		$('#myonoffswitch4').prop('checked', true);
	}
	// gradient menu
	if (document.querySelector('body').classList.contains('gradient-menu')) {
		$('#myonoffswitch25').prop('checked', true);
	}
	// dark menu
	if (document.querySelector('body').classList.contains('dark-menu')) {
		$('#myonoffswitch5').prop('checked', true);
	}
}
checkOptions();

function removeForTransparent() {
	'use strict'
	if (document.querySelector('body').classList.contains('header-light')) {
		document.querySelector('body').classList.remove('header-light')
	}
	// color header 
	if (document.querySelector('body').classList.contains('color-header')) {
		document.querySelector('body').classList.remove('color-header')
	}
	// gradient header 
	if (document.querySelector('body').classList.contains('gradient-header')) {
		document.querySelector('body').classList.remove('gradient-header')
	}
	// dark header 
	if (document.querySelector('body').classList.contains('dark-header')) {
		document.querySelector('body').classList.remove('dark-header')
	}

	// light menu
	if (document.querySelector('body').classList.contains('light-menu')) {
		document.querySelector('body').classList.remove('light-menu')
	}
	// color menu
	if (document.querySelector('body').classList.contains('color-menu')) {
		document.querySelector('body').classList.remove('color-menu')
	}
	// gradient menu
	if (document.querySelector('body').classList.contains('gradient-menu')) {
		document.querySelector('body').classList.remove('gradient-menu')
	}
	// dark menu
	if (document.querySelector('body').classList.contains('dark-menu')) {
		document.querySelector('body').classList.remove('dark-menu')
	}

	if (document.querySelector('body').classList.contains('transparent-theme')) {
		document.querySelector('body').classList.remove('light-header')
		document.querySelector('body').classList.remove('dark-header')
		document.querySelector('body').classList.remove('color-header')
		document.querySelector('body').classList.remove('gradient-header')
		document.querySelector('body').classList.remove('light-menu')
		document.querySelector('body').classList.remove('dark-menu')
		document.querySelector('body').classList.remove('color-menu')
		document.querySelector('body').classList.remove('gradient-menu')
	}
}



(function ($) {
	"use strict";

	//P-scrolling

	/*const ps2 = new PerfectScrollbar('.chat-scroll', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});
	const ps3 = new PerfectScrollbar('.Notification-scroll', {
	  useBothWheelAxes:true,
	  suppressScrollX:true,
	});

	const ps4 = new PerfectScrollbar('.cart-scroll', {
		useBothWheelAxes:true,
		suppressScrollX:true,
	  });
	

	  //p-scroll
	const ps1 = new PerfectScrollbar('.app-sidebar', {
		useBothWheelAxes: true,
		suppressScrollX: true,
	});*/


})(jQuery);


//$('body').append('<h1>Welcome to jQuery</h1>');

$(document).ready(function () {

	var stickyElement = $(".sticky"),
		stickyClass = "sticky-pin",
		stickyPos = 66, //Distance from the top of the window.
		stickyHeight;


	///Create a negative margin to prevent content 'jumps':
	stickyElement.after('<div class="jumps-prevent"></div>');
	function jumpsPrevent() {
		stickyHeight = stickyElement.innerHeight();
		stickyElement.css({ "margin-bottom": "-" + stickyHeight + "px" });
		stickyElement.next().css({ "padding-top": + stickyHeight + "px" });
	};
	jumpsPrevent(); //Run.

	//Function trigger:
	$(window).resize(function () {
		jumpsPrevent();
	});

	//Sticker function:
	function stickerFn() {
		var winTop = $(this).scrollTop();
		//Check element position:
		winTop >= stickyPos ?
			stickyElement.addClass(stickyClass) :
			stickyElement.removeClass(stickyClass) //Boolean class switcher.
	};
	stickerFn(); //Run.

	//Function trigger:
	$(window).scroll(function () {
		stickerFn();
	});

});

// sidemenu
$(document).ready(function () {
	$('.app-sidebar').scroll(function () {
		var s = $(".app-sidebar .ps__rail-y");
		if (s[0]?.style.top.split('px')[0] <= 60) {
			$('.app-sidebar').removeClass('sidebar-scroll')
		}
		else {
			$('.app-sidebar').addClass('sidebar-scroll')
		}
	})
});

// register globally for all charts
document.addEventListener('chartjs:init', function (event) {
	const Chart = event.detail.Chart;
	Chart.register(zoomPlugin);
});

// Forms
$(document).on('submit', 'form[data-toggle=\'ajax\']', function (e) {
	e.preventDefault();

	var element = this;

	var form = e.target;

	var action = $(form).attr('action');

	var enctype = $(element).attr('enctype');
	if (enctype === undefined) {
		enctype = 'application/x-www-form-urlencoded';
	}
	
	$.ajax({
		url: action,
		method: 'POST',
		data: $(form).serializeArray(),
		dataType: 'json',
		cache: false,
		contentType: enctype,
		processData: true,
		success: function (json) {
			console.log(json);

			if (json['success']) {
				$('.info-form .alert').removeClass('d-none');
				$('.info-form .alert').addClass('alert-success');
				$('.info-form .alert').html(json['success']);
			}

			if (json['error']) {
				$('.info-form .alert').removeClass('d-none');
				$('.info-form .alert').addClass('alert-danger');
				$('.info-form .alert').html(json['text']);
			}

			setTimeout(function() { 
				$('.info-form .alert').addClass('d-none');
			}, 4000);
			

		}
	});

});