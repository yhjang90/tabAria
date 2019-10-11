<<<<<<< HEAD
var tabList = $(".tab-list .tab"),
    tabPanels = $(".tab-panel"),
    firstTab = $(".tab:first-of-type"),
    lastTab = $(".tab:last-of-type");

var keyCodes = {
    tab: 9,
    home: 36,
    end: 35,
    left: 37,
    right: 39
}

function resetTabView(){
    $(".tab:first-of-type, .tab-panel:first-of-type").addClass("active").attr("tabindex", "0");
    firstTab.attr("aria-selected", "true");
}
resetTabView();

function mouseDown(index, $this){
    var currentTab = tabList.eq(index);
    activeTab(currentTab);
    activePanel($this);
}


function activeTab(currentTab) {
    resetTabView();
    currentTab.addClass("active").attr({"tabindex":"0", "aria-selected":"true"}).focus().siblings().removeClass("active").attr({"tabindex":"-1", "aria-selected":"false"});
}
function activePanel($this){
    $("#" + $($this).attr("aria-controls")).attr("tabindex", "0").addClass("active").siblings(".tab-panel").attr("tabindex", "-1").removeClass("active");
}

function keyCodeLeft($this){
    var currentTab = $($this).prev();   
    if($this.previousElementSibling){
        $($this).attr("tabindex", "-1").prev().attr("tabindex", "0").focus();
        activeTab(currentTab);
        activePanel(currentTab);
    }else{
        lastTab.attr("tabindex", "0").focus();
        activeTab(lastTab);
        activePanel(lastTab);
    }
}

function keyCodeRig($this){
    var currentTab = $($this).next();
    if($this.nextElementSibling){
        $($this).attr("tabindex", "-1").next().attr("tabindex", "0").focus();
        activeTab(currentTab);
        activePanel(currentTab);
    }else{
        $($this).attr("tabindex", "-1");
        firstTab.attr("tabindex", "0").focus();
        activeTab(firstTab);
        activePanel(firstTab);
    }
}

function keyCodeHome(){
    tabList.removeClass("active");
    firstTab.addClass("active").focus();
    activePanel(firstTab);
}

function keyCodeEnd(){
    tabList.removeClass("active");
    lastTab.addClass("active").focus();
    activePanel(lastTab);
}

tabList.on("keydown", function(e){
    e = e || window.e;
    e.preventEwfault ? e.preventDefault() : e.returnValue = false;
    var keycode = e.keycode || e.which;
    var $this = this;
    switch(keycode){
        case keyCodes.left:
            keyCodeLeft($this);
            break;
        case keyCodes.right:
            keyCodeRig($this);
            break;
        case keyCodes.home:
            keyCodeHome();
            break;
        case keyCodes.end:
            keyCodeEnd();
            break;
    }
});

$(".tab-list").on("keydown", ".active", function(e){
    e = event || window.event;
    var keycode = e.keycode || e.which;

    if(!e.shiftkey && keycode === 9){
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        $("#" + $(this).attr("aria-controls")).attr("tabindex", "0").addClass("active").focus().siblings(".tab-panel").attr("tabindex", "-1").removeClass("active");
    }
})

tabList.on("click", function(){
    var $this = $(this);
    currentTab = $this.index();
    mouseDown(currentTab, $this);
})

=======
var $tabListWrap   =   $(".tab-wrap");

if($tabListWrap.length){
    $tabListWrap.each(function(){
        var $this = $(this);
        var tabList = $this.find(".tab-list .tab"),
            tabPanels = $this.find(".tab-panel"),
            firstTab = tabList.first(),
            lastTab = tabList.last();
        var initialIndex = parseInt($this.attr("data-initial-index")) || 0;
 
        var keyCodes = {
            tab: 9,
            home: 36,
            end: 35,
            left: 37,
            right: 39
        }

        function initialTabView(){
            tabList.eq(initialIndex).addClass("active").attr("aria-selected", "true");
            tabPanels.eq(initialIndex).attr("tabindex", "0").addClass("active");
        }

        function resetTabView(){
            tabList.attr({"aria-selected": "flase"}).removeClass("active");
            tabPanels.attr("aria-selected", "false").removeClass("active");
        }

        function activeTab(index, isFocus) {
            var isFocusBool = isFocus || false;
            resetTabView();
            tabList.eq(index).addClass("active").attr({"aria-selected":"true"});
            if(isFocusBool === true) {
                tabList.eq(index).focus();
            }
        }

        function activePanel(index){
            tabPanels.eq(index).addClass("active");
        }

        initialTabView();

        tabList.on("click", function(){
            var $this = $(this);
            var currentIndex = $this.index();
            activeTab(currentIndex);
            activePanel(currentIndex);
        })

        tabList.on("keydown", function(e){
            e = e || window.e;
            e.preventEwfault ? e.preventDefault() : e.returnValue = false;

            var keycode = e.keycode || e.which;
            var currentIndex = $(this).index();
            var activeTabIndex = null;

            if($(e.target).is(".tab.active")){
                if(!e.shiftkey && keycode === keyCodes.tab){
                    tabPanels.eq(currentIndex).focus();
                    return false;
                }
            }

            switch(keycode){
                case keyCodes.left:
                    if(currentIndex === firstTab.index()){
                        activeTabIndex = lastTab.index();
                    }else{
                        activeTabIndex = currentIndex - 1;
                    }
                    break;
                case keyCodes.right:
                    if(currentIndex === lastTab.index()){
                        activeTabIndex = firstTab.index();
                    }else{
                        activeTabIndex = currentIndex + 1;
                    }
                    break;
                case keyCodes.home:
                    activeTabIndex = firstTab.index();
                    break;
                case keyCodes.end:
                    activeTabIndex = lastTab.index();
                    break;
            }

            if(activeTabIndex !== null){
                activeTab(activeTabIndex, true);
                activePanel(activeTabIndex);
                activeTabIndex = null;
            }
        });

        tabPanels.on("keydown", function(e){
            e = e || window.e;
            e.preventEwfault ? e.preventDefault() : e.returnValue = false;

            var keycode = e.keycode || e.which;
            var currentIndex = tabPanels.index($(e.target));
            var activeTabIndex = null;

            if($(e.target).is(".tab-panel.active")){
                if(!e.shiftkey && keycode === keyCodes.tab){
                    activeTabIndex = currentIndex + 1;
                    tabList.eq(activeTabIndex).focus();
                    activeTabIndex = null;
                    return false;
                }
            }
        })
    })
}
>>>>>>> 155bc3f2b18b174c03d09e37e6b315e62d2e7c60
