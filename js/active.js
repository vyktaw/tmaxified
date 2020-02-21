let currentEvent;

const backendUrl = 'http://maxhealth.herokuapp.com';


(function ($) {
    'use strict';

    var browserWindow = $(window);

    function loadEvents() {
        fetch(`${backendUrl}/events`).then(function (response) {
            // The API call was successful!
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            event = data.events;
            event.forEach(function(event) {
                const node = document.createElement("LI");
                const secondNode = document.createElement("A");
                const textnode = document.createTextNode(event.title);
                secondNode.href = "event.html";
                secondNode.appendChild(textnode);
                node.appendChild(secondNode);
                node.addEventListener("click", function() {
                    // localStorage.removeItem("event")
                    localStorage.setItem("event_venue", event.venue);
                    localStorage.setItem("event_title", event.title);
                    localStorage.setItem("event_date", event.event_date);
                    // setEventDetails(event);
                  });
                document.getElementById("event-dropdown").appendChild(node);
            }); 
            // document.getElementById("slideContainer").innerHTML = str;
        }).catch(function (err) {
            
        });
    }

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {

        loadEvents();
        
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#fitnessNav').classyNav();
    }

    // :: 3.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-slides');
        var testiSlide = $('.testimonials-slides');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['Prev', 'Next'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 10000,
            smartSpeed: 1500
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        var dot = $('.hero-slides .owl-dot');
        dot.each(function () {
            var index = $(this).index() + 1 + '.';
            if (index < 10) {
                $(this).html('0').append(index);
            } else {
                $(this).html(index);
            }
        });

        testiSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 10000,
            smartSpeed: 600
        });
    }

    // :: 4.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }

    // :: 5.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 6.0 Sticky Active Code
    if ($.fn.sticky) {
        $(".fitness-main-menu").sticky({
            topSpacing: 0
        });
    }

    // :: 7.0 Progress Bar Active Code
    if ($.fn.circleProgress) {
        $('#circle').circleProgress({
            size: 200,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#34af42',
            thickness: '6',
            reverse: true
        });
        $('#circle2').circleProgress({
            size: 200,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#34af42',
            thickness: '6',
            reverse: true
        });
        $('#circle3').circleProgress({
            size: 200,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#34af42',
            thickness: '6',
            reverse: true
        });
        $('#circle4').circleProgress({
            size: 200,
            emptyFill: "rgba(0, 0, 0, .0)",
            fill: '#34af42',
            thickness: '6',
            reverse: true
        });
    }

    // :: 8.0 prevent default a click
    $('a[href="#"]').click(function ($) {
        $.preventDefault()
    });

    // :: 9.0 wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }

})(jQuery);
$(document).ready(function () {


	/* Toggle Video Modal
  -----------------------------------------*/
    function toggle_video_modal() {

        // Click on video thumbnail or link
        $(".js-trigger-video-modal").on("click", function (e) {

            // prevent default behavior for a-tags, button tags, etc. 
            e.preventDefault();

            // Grab the video ID from the element clicked
            var id = $(this).attr('data-youtube-id');

            // Autoplay when the modal appears
            // Note: this is intetnionally disabled on most mobile devices
            // If critical on mobile, then some alternate method is needed
            var autoplay = '?autoplay=1';

            // Don't show the 'Related Videos' view when the video ends
            var related_no = '&rel=0';

            // String the ID and param variables together
            var src = '//www.youtube.com/embed/' + id + autoplay + related_no;

            // Pass the YouTube video ID into the iframe template...
            // Set the source on the iframe to match the video ID
            $("#youtube").attr('src', src);

            // Add class to the body to visually reveal the modal
            $("body").addClass("show-video-modal noscroll");

        });

        // Close and Reset the Video Modal
        function close_video_modal() {

            event.preventDefault();

            // re-hide the video modal
            $("body").removeClass("show-video-modal noscroll");

            // reset the source attribute for the iframe template, kills the video
            $("#youtube").attr('src', '');

        }
        // if the 'close' button/element, or the overlay are clicked 
        $('body').on('click', '.close-video-modal, .video-modal .overlay', function (event) {

            // call the close and reset function
            close_video_modal();

        });
        // if the ESC key is tapped
        $('body').keyup(function (e) {
            // ESC key maps to keycode `27`
            if (e.keyCode == 27) {

                // call the close and reset function
                close_video_modal();

            }
        });
    }
    toggle_video_modal();



});



$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    // var event = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Register to attend ' + localStorage.getItem("event_title"))
    modal.find('.modal-body #event-name').val(localStorage.getItem("event_title"))
    modal.find('.modal-body #event-date').val(localStorage.getItem("event_date"))
});



function submit() {
    fetch(`${backendUrl}/events/register`, {
        method: 'POST',
        body: JSON.stringify(getFormObj('event-form')),
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer'
    }).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        swal({
            title: "Good job!",
            text: "Registration Successful! Please check your inbox for an email.",
            icon: "success",
            timer: 10000
        });
        $('#exampleModal').modal('hide');
    }).catch(function (err) {
        swal({
            title: "Error",
            text: "Something went Wrong",
            icon: "error",
            timer: 10000
        });
        // There was an error
        console.warn('Something went wrong.', err);
    });
    
};


function buyNow() {

    fetch(`${backendUrl}/orders`, {
        method: 'POST',
        body: JSON.stringify(getFormObj('order-form')),
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer'
    }).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        $('#buyModal').modal('hide');
        swal({
            title: "Good job!",
            text: "Order Completed! Please check your inbox for an email.",
            icon: "success",
            timer: 10000
        });

    }).catch(function (err) {
        swal({
            title: "Error",
            text: "Something went Wrong",
            icon: "error",
            timer: 10000
        });
        // There was an error
        console.warn('Something went wrong.', err);
    });

    
};

function getFormObj(formId) {
    console.log(formId);
    var formObj = {};
    var inputs = $('#' + formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    console.log(formObj)
    return formObj;
}

function showJoinModal() {
    $('#myModal').modal('show')
}

function joinNow() {


    fetch(`${backendUrl}/users`, {
        method: 'POST',
        body: JSON.stringify(getFormObj('join-form')),
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer'
    }).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        $('#myModal').modal('hide');
        // This is the JSON from our response
        swal({
            title: "Done!",
            text: "Registration Successful! Please check your inbox for an email.",
            icon: "success",
            timer: 10000
        });
    }).catch(function (err) {
        swal({
            title: "Error",
            text: "Something went Wrong",
            icon: "error",
            timer: 10000
        });
        // There was an error
        console.warn('Something went wrong.', err);
    });

    
    
};

const loadUsers = () => {
    fetch(`${backendUrl}/users`).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        users = data.users;

        const userTbody = document.querySelector("#user-table tbody");
  
        addDataToTbody(userTbody, users);
         
        // document.getElementById("slideContainer").innerHTML = str;
    }).catch(function (err) {
        
    });
}

const loadOrders = () => {
    fetch(`${backendUrl}/orders`).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        orders = data.orders;

        const orderTbody = document.querySelector("#order-table tbody");
  
        addDataToTbody(orderTbody, orders);
         
        // document.getElementById("slideContainer").innerHTML = str;
    }).catch(function (err) {
        
    });
}

function addDataToTbody(nl, data) { // nl -> NodeList, data -> array with objects
    data.forEach((d, i) => {
      var tr = nl.insertRow(i);
      Object.keys(d).forEach((k, j) => { // Keys from object represent th.innerHTML
        var cell = tr.insertCell(j);
        cell.innerHTML = (k != 'order_date') ? d[k] : new Date(d[k]).toLocaleDateString('en-GB'); // Assign object values to cells   
      });
      nl.appendChild(tr);
    })
}

function maxEvent() {
    fetch(`${backendUrl}/events`, {
        method: 'POST',
        body: JSON.stringify(getFormObj('create-event')),
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer'
    }).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        swal({
            title: "Done!",
            text: "Event Created!",
            icon: "success",
            timer: 10000
        });
        console.log(data);
    }).catch(function (err) {
        swal({
            title: "Error",
            text: "Something went Wrong",
            icon: "error",
            timer: 10000
        });
        // There was an error
        console.warn('Something went wrong.', err);
    });
}
  
function setEventDetails() {
    $('#event_title').text(localStorage.getItem("event_title"))
    $('#clock-b').countdown(new Date(localStorage.getItem("event_date")).toLocaleDateString('en-US')).on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime(''
          + '<div class="holder m-2"><span class="h1 font-weight-bold">%D</span> Day%!d</div>'
          + '<div class="holder m-2"><span class="h1 font-weight-bold">%H</span> Hr</div>'
          + '<div class="holder m-2"><span class="h1 font-weight-bold">%M</span> Min</div>'
          + '<div class="holder m-2"><span class="h1 font-weight-bold">%S</span> Sec</div>'));
      });
}


