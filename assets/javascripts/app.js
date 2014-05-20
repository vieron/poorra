var u = {
    stopPropagation: function(e) {
        e && e.stopPropagation();
    }
};



function App() {

    this.init();
}

$.extend(App.prototype, {
    init: function() {
        // document ready
        $(this.onReady.bind(this));
    },

    onReady: function() {
        this.matches = new Matches($('.Matches'));
        this.sidebar = new Sidebar($('.App-sidebar'));

        this.events();
    },

    events: function() {
        FastClick.attach(document.body);

        $('body').on('click', '.App-header .User', this.toggleSidebar.bind(this));
    },

    toggleSidebar: function(e) {
        e && e.stopPropagation();
        this.sidebar.toggle();
    }
});




function Sidebar($el) {
    this.$el = $el;
    this.isOpen = false;
    this.init();
}

$.extend(Sidebar.prototype, {
    init: function() {
        $('body').on('click', function() {
            this.isOpen && this.toggle();
        }.bind(this));

        this.$el.on('click', u.stopPropagation);
    },

    toggle: function() {
        this.isOpen = !this.isOpen;
        this.$el.toggleClass('js-isOpen');
    }
});




function Matches($el) {
    this.$el = $el;
    this.init();
}


$.extend(Matches.prototype, {
    init: function() {
        this.splitIn2Cols();

        this.events();
    },

    events: function() {
        this.$el.on('click', '.Btn--cancel', this.toggleMatch.bind(this));
        this.$el.on('click', '.Match-bet', this.toggleMatch.bind(this));
        this.$el.on('click', '.Match-result', u.stopPropagation);
    },

    toggleMatch: function(e) {
        var $target = $(e.target);
        var $item = $target.closest('.Match');
        this.$el.find('.js-isOpen').not($item).removeClass('js-isOpen');
        $item.toggleClass('js-isOpen');
    },

    splitIn2Cols: function() {
        this.$days = this.$el.find('.Journey');
        var mid = Math.round(this.$days.length / 2);
        var $firstCol = this.$days.slice(0, mid);
        var $secondCol = this.$days.slice(mid, this.$days.length);
        $firstCol.wrapAll('<div class="Matches-col" />');
        $secondCol.wrapAll('<div class="Matches-col" />');
    }
});




var app = new App();