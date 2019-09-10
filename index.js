

var oli = $('li');
var num = 1;
var flag = false;
init();
function init () {
    getData();
}

function getData () {
    if(!flag) {
        flag = true;
        $.ajax({
            type: 'get',
            url: 'http://localhost/ppl/data.txt',
            // url: 'http://localhost/ppl/getPics.php?cpage=1',
            success: function (data) {
                console.log(data)
                render(JSON.parse(data));
            },
            beforeSend: function (data) {
                console.log(data.readyState)
                if(data.readyState === 0) {
                    $('.loading').fadeIn(100);
                }
            },
            complete: function (data) {
                console.log(data.status)
                if(data.status === 200) {
                    $('.loading').fadeOut(300);
                }
            }
        })
        num++;
    }
    
}

function render(data) {
    for(var i = 0; i < data.length ; i ++) {
        var min = getMin();
        var oDiv = $('<div class="box"></div>')
        var oImg = new Image();
        oImg.src = data[i].preview;
        var oSpan = $('<span></span>');
        var oP = $('<p></p>')
        oP.text(data[i].title)
        // oImg.onload = function () {
            oSpan.append(oP);
            oDiv.append(oImg).append(oSpan);
            $('li').eq(min).append(oDiv)
        // }   
    }
    flag = false
}
function getMin() {
    
    
    var temp = $('li')[0].offsetHeight;
    var min = 0;
    for(var i = 1 ; i < oli.length ; i ++) {
        if(temp > oli[i].offsetHeight) {
            temp = oli[i].offsetHeight
            min = i;
        }
    }
    
    return min
}

$(window).scroll(function () {
    var scrollHeight = $(this).scrollTop();
    var clientHeight = $(window).height();
    var pageHeight = parseInt($(oli[getMin()]).css('height'));
    // if(scrollHeight + clientHeight > pageHeight) {
    //     getData()
    // }
    console.log(scrollHeight , clientHeight ,pageHeight)
})