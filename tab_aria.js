var $tabListWrap = $(".tab-wrap");

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