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

