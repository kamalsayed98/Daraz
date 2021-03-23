
fetch('https://profile-srv.herokuapp.com/data')
    .then(response => response.json())
    .then(json => {
        fillBodyDataA(json);
        showLoadedDiv();
    });

function fillBodyDataA(json) {
    headerData(json.headerData);
    aboutMeData(json.aboutMeData);
    projectsData(json.projectsData);
    friendsData(json.friendsData);
    hobbiesData(json.hobbiesData);
    blueSeperatorData(json.blueSeperatorData);
    contactMeData(json.contactMeData);
}


function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

function friendsData(json) {

}

function contactMeData(json) {
    if(!json) return;
    const contactMeTitle = document.getElementById('contactMeTitle');
    contactMeTitle.innerText = json.title;
    if(json.data){
        const contactMeAdditionalData = document.getElementById('contactMeAdditionalData');
        for (let i = 0; i < json.data.length; i++) {
            const e = json.data[i];
            var element = e.text;
            if(e.href){
                element = '<a href="'+e.href+'">'+element+'</a>' 
            }
            element = '<span><i class="fa '+e.class+' fa-lg"></i>'+element+'</span>';
            contactMeAdditionalData.appendChild(htmlToElements(element));
        }
    }
}

function showLoadedDiv() {
    const loadingDiv = document.getElementById("loadingBody")
    loadingDiv.style.display = "none";
    const loadedDive = document.getElementById("loadedBody")
    loadedDive.style.display = "block";
}


function headerData(json) {

    const headerTitle = document.getElementById("header-title")
    headerTitle.innerText = json.headerTitle;
    tabs = json.headerTabs;
    if (tabs) {
        const headerTabsUL = document.getElementById("headerTabsUL")
        for (let i = 0; i < tabs.length; i++) {
            const e = tabs[i];
            const li = document.createElement("li");
            li.innerHTML = '<a href="#' + e.href + '">' + e.text + '</a>';
            headerTabsUL.appendChild(li)
        }
    }
    const dataHeader = json.headerBody;
    if (dataHeader) {
        const loaderSVG = new SVGLoader(document.getElementById('loader'), { speedIn: 600, speedOut: 600, easingIn: mina.easeinout });
        loaderSVG.show();
        (function ($) {
            "use strict"

            var aPrev = $(".nav-slide a.prev"),
                aNext = $(".nav-slide a.next"),
                NextTitle = $(".nav-slide a.next h3"),
                NextAuthor = $(".nav-slide a.next p"),
                NextImg = $(".nav-slide a.next img"),
                PrevTitle = $(".nav-slide a.prev h3"),
                PrevAuthor = $(".nav-slide a.prev p"),
                PrevImg = $(".nav-slide a.prev img"),
                activeSlide = $(".image-slide"),
                activeTitle = $(".slider-content h2"),
                activeIndex, nextIndex, prevIndex,
                objHeaderLength = dataHeader.length - 1,
                SliderTimeout = false;

            aPrev.on("click", function () {
                loader(false);
            });

            aNext.on("click", function () {
                loader(true);
            });

            function SliderInterval() {
                SliderTimeout = setInterval(function () {
                    if (SliderStatus) loader(true);
                }, 8000);
            }

            function startImageHeader() {
                if (typeof activeIndex === "undefined") {
                    activeIndex = 0;
                    nextIndex = 1;
                    prevIndex = objHeaderLength;
                }

                dataHeader.forEach(function (a) {
                    a.show = false;
                });

                dataHeader[activeIndex].show = true;

                new preLoader([dataHeader[activeIndex].bigImage, dataHeader[prevIndex].bigImage, dataHeader[nextIndex].bigImage], {
                    onComplete: function (loaded, errors) {

                        var brokenImage = "images/broken-image.jpg",
                            activeImg = dataHeader[activeIndex].bigImage,
                            prevImg = dataHeader[prevIndex].bigImage,
                            nextImg = dataHeader[nextIndex].bigImage;

                        if (errors) {
                            for (var i = 0; i < errors.length; i++) {
                                activeImg = (errors[i] === activeImg) ? brokenImage : activeImg;
                                prevImg = (errors[i] === prevImg) ? brokenImage : prevImg;
                                nextImg = (errors[i] === nextImg) ? brokenImage : nextImg;
                            }
                        }

                        setTimeout(function () {
                            loaderSVG.hide();
                            SliderInterval();
                        }, 2000);

                        activeSlide.css("background-image", "url('" + activeImg + "')");

                        PrevImg.attr("src", prevImg);

                        NextImg.attr("src", nextImg);
                    }
                });

                activeTitle.text(dataHeader[activeIndex].title);

                PrevAuthor.text("by " + dataHeader[prevIndex].author);
                PrevTitle.text(dataHeader[prevIndex].title);
                NextAuthor.text("by " + dataHeader[nextIndex].author);
                NextTitle.text(dataHeader[nextIndex].title);
            }

            function loader(n) {
                clearInterval(SliderTimeout);
                loaderSVG.show();

                for (var i = 0; i <= objHeaderLength; i++) {
                    if (dataHeader[i].show && n) {
                        activeIndex = (i + 1 > objHeaderLength) ? 0 : i + 1;
                        nextIndex = (activeIndex + 1 > objHeaderLength) ? 0 : activeIndex + 1;
                        prevIndex = i;

                        break;
                    }
                    else if (dataHeader[i].show && !n) {
                        activeIndex = (i - 1 < 0) ? objHeaderLength : i - 1;
                        prevIndex = (activeIndex - 1 < 0) ? objHeaderLength : activeIndex - 1;
                        nextIndex = i;
                        break;
                    }
                }

                setTimeout(function () {
                    startImageHeader();
                }, 800);
            }

            startImageHeader();

        })(jQuery);

    }

}

function aboutMeData(json) {
    if (!json) return;
    document.getElementById("aboutMeTitle").innerHTML = json.title
    document.getElementById("aboutMeSubTitile").innerHTML = json.subTitile
    const aboutMeTabs = document.getElementById("aboutMeTabs");
    const tabs = json.tabs;
    for (let i = 0; i < tabs.length; i++) {
        const e = tabs[i];
        const element =
            `<div class="about-content left animated fadeInLeft visible" data-animate="fadeInLeft">
            <div class="about-icon"><i class="fa `+ e.class + `"></i></div>
            <div class="about-detail">
            <h4>`+ e.title + `</h4>
            <p>`+ e.description + `</p>
            </div>
        </div>`;
        const div = document.createElement('div');
        div.innerHTML = element;
        aboutMeTabs.appendChild(div)

    }

}

function projectsData(json) {
    const filters = document.getElementById("filters");
    // <li data-filter=".flutter" class="filter">Flutter</li>
    if (json.cats) {
        for (let i = 0; i < json.cats.length; i++) {
            const e = json.cats[i];
            filters.appendChild(htmlToElements('<li data-filter=".' + e.dataFilter + '" class="filter">' + e.name + '</li>'))
        }
    }
    if (json.data) {
        var cv = json.data;

        // $(document).on("ready", function () {
        "use strict"

        function columnsSplit() {
            if ($(window).innerWidth() >= 1200)
                return 4
            else if ($(window).innerWidth() >= 992)
                return 3
            else if ($(window).innerWidth() >= 768)
                return 2
            else return 1
        }

        var portWidth = ($(window).innerWidth() / columnsSplit() -5),
            containercv = $(".container-cv"),
            portImage = [];

        $(window).on("resize", function () {
            $(".container-cv .cv-view").each(function (a, b) {
                $(b).css({
                    "width": $(window).innerWidth() / columnsSplit(),
                    "height": ($(window).innerWidth() / columnsSplit() - 113)
                });
            });
        });

        $.each(cv, function (a, b) {
            portImage.push(b.image);
        });

        new preLoader(portImage, {
            onComplete: function (load, errors) {
                $.each(cv, function (a, b) {
                    var image = (typeof b.image === "undefined") ? "images/broken-image.jpg" : b.image;

                    if (errors) {
                        for (var i = 0; i < errors.length; i++) {
                            image = (errors[i] === image) ? "images/broken-image.jpg" : image;
                        }
                    }
                    var portList = $('<figure class="cv-view ' + b.category + '" style="width:' + portWidth  + 'px;height:' + (portWidth - 113) + 'px"><img src="' + image + '"><figcaption><h2>' + b.title + '</span></h2><p>' + b.text + '</p><a href="' + b.link + '">View more</a></figcaption></figure>');

                    portList.appendTo(containercv);
                });

                $(".container-cv").mixItUp({
                    selectors: {
                        target: ".cv-view"
                    },
                    animation: {
                        effects: "fade stagger scale rotateX(-360deg)",
                        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)"
                    }
                });
            }
        });
        // });

    }
}

function hobbiesData(json) {
    if (!json) return;
    const hobbiesContainer = document.getElementById('hobbiesContainer');
    const row1Text = `<div class="col-md-6">
              <div class="skill">
                <ul id="hobbiesContainerRow1"  class="skill-bar list-unstyled">
                </ul>
              </div>
            </div>`
    hobbiesContainer.appendChild(htmlToElements(row1Text));
    const row1 = document.getElementById('hobbiesContainerRow1');
    for (let i = 0; i < json.length / 2; i++) {
        const e = json[i];
        row1.appendChild(htmlToElements('<li><span class="percentage" data-value="' + e.percentage + '%"></span><em>' + e.title + '</em></li>'))
    }
    const row2Text = `<div class="col-md-6">
              <div class="skill">
                <ul id="hobbiesContainerRow2"  class="skill-bar list-unstyled">
                </ul>
              </div>
            </div>`
    hobbiesContainer.appendChild(htmlToElements(row2Text));
    const row2 = document.getElementById('hobbiesContainerRow2');
    for (let i = Math.floor(json.length / 2) + 1; i < json.length; i++) {
        const e = json[i];
        row2.appendChild(htmlToElements('<li><span class="percentage" data-value="' + e.percentage + '%"></span><em>' + e.title + '</em></li>'))
    }
    $(".skill-bar .percentage").appear(function () {
        var element = $(this),
            animation = element.data("value");
        element.animate({
            "width": animation
        }, 2000);
    });
}


function blueSeperatorData(json) {
    if (!json) return;
    const blueSeparatorContainer = document.getElementById('blueSeparatorContainer');
    for (let i = 0; i < json.length; i++) {
        const e = json[i];
        const element =
            `<div class="col-md-3 col-sm-6 col-xs-6">
                <div class="counter animated" data-animate="fadeInUp" data-delay="1000">
                <div class="counter-icon">
                    <i class="fa `+ e.icon + `"></i>
                </div>
                <div class="counter-content">
                    <span class="value" data-from="0" data-to="`+ e.dataTo + `"></span>
                    <small>`+ e.text + `</small>
                </div>
                </div>
            </div>`;
        blueSeparatorContainer.appendChild(htmlToElements(element));
    }
    $(".animated").appear(function () {
        var element = $(this),
            animation = element.data("animate"),
            animationDelay = element.data("delay");

        if (animationDelay) {
            setTimeout(function () {
                element.addClass(animation + " visible");
                if (element.hasClass("counter")) {
                    element.find('.value').countTo();
                }
            }, animationDelay);
        } else {
            element.addClass(animation + " visible");
            if (element.hasClass("counter")) {
                element.find(".value").countTo();
            }
        }
    }, {
        accY: -150
    });

}
