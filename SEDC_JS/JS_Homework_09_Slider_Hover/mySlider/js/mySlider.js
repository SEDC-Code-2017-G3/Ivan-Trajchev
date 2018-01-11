$.fn.mySlider = function (options) {
    let navLinks, ul, len, interval;
    let defaultOptions = {
        auto: true,
        navLinks: true,
        navLinksPosition: "bellow"
    }

    let opt = $.extend({}, defaultOptions, options);
    $(this).each(function (i, item) {

        let activeSlide = 0;

        console.log(item);
        let slider = $(item);
        let imgs = slider.find("img");
        let wrapper = $("<div>").attr("class", "wrapper");
        imgs.wrapAll(wrapper);

        imgs.each(function (i, img) {
            let content = $("<div>")
                .attr("class", "content")
                .attr("data-id", i);
            $(img).wrapAll(content);
        });
        if (opt.navLinks) {
            navLinks = $(`<div class="navLinks">`);
            ul = $("<ul>").appendTo(navLinks);
            len = imgs.length

            for (let i = 0; i < len; i++) {
                $("<li>")
                    .attr("class", "itemLinks")
                    .attr("data-id", i)
                    .on("click", function () {
                        activeSlide = i;
                        removeActive();
                        setActive();
                    }).appendTo(ul)

            }

            switch (opt.navLinksPosition) {
                case "above":
                    slider.prepend(navLinks);
                    break;
                case "bellow":
                default:
                    slider.append(navLinks);
                    break;
            }

        }

        function setActive() {
            slider.children(".wrapper").find(`[data-id="${activeSlide}"]`)
                .addClass("active")
                .on("hover", function () {

                });
            if (navLinks != undefined) {
                navLinks.find(`[data-id="${activeSlide}"]`).addClass("active");
            }
        }

        function removeActive() {
            $(".active").removeClass("active");
        }

        setActive();

        //I wrapped the setInterval and clearInterval in a function which can be called with a boolean
        //argument. In the if statement i check wether a boolean value is passed
        //just to make shure if anything else (string, number) or no arguments are passed to stop the interval
        
        function autoSlide(start) {
            if (typeof start === "boolean" && start) {
                interval = setInterval(function () {
                    activeSlide < len - 1 ? activeSlide++ : activeSlide = 0;
                    removeActive();
                    setActive();
                }, 1200);
            }
            else {
                clearInterval(interval);
                interval = null;
            }
        }

        if (opt.auto) {
            autoSlide(true);
        }
        //Here I select the image and item buttons and on hover in i call the autoSlide function
        //with false argument and on hover out i call it with true
        $(".content, .itemLinks").hover(() => { autoSlide(false) }, () => { autoSlide(true) });

    });


    //in order to be able to chain methods
    return $(this);
}