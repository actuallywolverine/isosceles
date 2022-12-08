gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
        return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform
        ? "transform"
        : "fixed"
});


var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".one",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=1000%"
    }
});

tl.to(".big", {
    rotation: 360, xPercent: -20, duration: 2, transformOrigin: "left center", ease: "none"
})
    .to(".top", { rotation: 180, duration: 2, transformOrigin: "left center", ease: "none" }, "<")
    .to(".bottom", { rotation: 180, xPercent: 50, yPercent: 50, duration: 2, transformOrigin: "right center", ease: "none" }, "<")
    .to(".bottom", { yPercent: 300 })
    .to(".top", { yPercent: 350 })
    .to(".big", { scale: 12.2, transformOrigin: "center" })
    .to(".logo", { autoAlpha: 0 })
    .to(".outside", { autoAlpha: 0 }, "<")
    .to(".one", { backgroundColor: "#42E2B8", duration: 2 })
    .to(".ftitle", { xPercent: -50, autoAlpha: 0, duration: 2, ease: "back.in" })
    .to(".fftitle", { yPercent: -100, autoAlpha: 0, duration: 2, ease: "back.in" })
    .to(".new", { autoAlpha: 1 })
    .to(".one", { backgroundColor: "white", duration: 2 })
    .from(".wrz", { yPercent: -100, autoAlpha: 0, })
    .from(".diff", { autoAlpha: 0, duration: 2, })
    .from(".wrzz", { xPercent: 100, autoAlpha: 0, duration: 2 })
    .from(".diff2", { autoAlpha: 0 })
    .from(".wrzzz", { xPercent: -100, autoAlpha: 0, duration: 2 })

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".two",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=1000%"
    }
});

tl2.from(".boxd", { scale: 0, ease: "bounce", duration: 2 })
    .from(".stitle", { xPercent: -50, autoAlpha: 0, duration: 2, ease: "back", stagger: 1 })
    .from(".swords", { autoAlpha: 0, duration: 2, stagger: 1 })

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".three",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=1000%"
    }
});

tl3.from(".sq_one", { yPercent: 100, scale: 0 })
    .from(".sq_two", { yPercent: 100, scale: 0 })
    .from(".sq_three", { xPercent: 100, scale: 0 })
    .from(".sq_four", { yPercent: 100, scale: 0 })



var tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".five",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=1000%"
    }
})

tl4.from(".outer", { scale: 0, ease: "bounce", duration: 2 })
    .from(".btitle", { yPercent: -100, autoAlpha: 0, duration: 2, ease: "back" })
    .from(".logos_container", { xPercent: -100, autoAlpha: 0, duration: 2, ease: "back" })
    .from("img", { xPercent: -100, autoAlpha: 0, duration: 2, ease: "back", stagger: 0.5, duration: 2 })

var tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: ".six",
        scroller: ".smooth-scroll",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=1000%"
    }
})

tl5.from(".last", { xPercent: -100, duration: 2, ease: "back" })
    .from(".contact", { autoAlpha: 0, yPercent: 100, ease: "back", duration: 1.5 })


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

