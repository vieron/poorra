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

        $('body')
            .on('click', '.App-header .User', this.toggleSidebar.bind(this))
            .on('keyup', this.closeOnEsc.bind(this));
    },

    closeOnEsc: function(e) {
        if (e.keyCode === 27) { // ESC key
            Matches.closeCurrent();
        }
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

        // this.$el.on('click', u.stopPropagation);
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

$.extend(Matches, {
    $open: undefined,

    toggleClass: 'js-isOpen',

    closeCurrent: function() {
        Matches.$open && Matches.prototype.close.call(Matches.prototype, Matches.$open);
    }
});

$.extend(Matches.prototype, {

    init: function() {
        this.bet = new Bet();
        this.events();
    },

    events: function() {
        this.$el.on('click', '.Btn--cancel', this.toggleMatch.bind(this));
        this.$el.on('click', '.Match-bet', this.toggleMatch.bind(this));
        this.$el.on('click', '.Match-result', u.stopPropagation);
        this.$el.on('submit', 'form', this.onSubmit.bind(this));
    },

    toggleMatch: function(e) {
        var $item = $(e.target).closest('.Match');
        var toOpen = ! $item.hasClass(Matches.toggleClass);

        this[toOpen ? 'open' : 'close']($item);
    },

    open: function($item) {
        Matches.$open && this.close(Matches.$open);

        $item.find('form').append($('#Bet-template').html());
        Matches.$open = $item;
        $item.addClass(Matches.toggleClass);

        $item.find('.Bet input').first().focus();
    },

    close: function($item) {
        $item.find('form fieldset').remove();
        $item.removeClass(Matches.toggleClass);
        Matches.$open = null;
    },

    onSubmit: function(e) {
        e.preventDefault();

        this.bet.doBet($(e.target));
    }
});


function Bet(options) {
    this.init();
}

$.extend(Bet.prototype, {
    init: function() {},

    doBet: function($form) {
        // $.ajax({
        //     url: $form.attr('action'),
        //     type: 'POST',
        //     data: $form.serialize()
        // })
        // .success(this._onSuccess.bind($form))
        // .error(this._onError.bind($form))
        // .complete(this._onComplete.bind($form));

        // mock ajax request
        setTimeout(function() {
            this._onSuccess.call($form);
            this._onComplete.call($form);
        }.bind(this), 600);

        $form.find('.Btn--submit').addClass('js-isWaiting');
    },

    _onSuccess: function(data) {
        Matches.prototype.close.call(Matches.prototype, Matches.$open);
    },

    _onError: function() {},

    _onComplete: function() {
        $(this).find('.Btn--submit').removeClass('js-isWaiting');
    }
});


var app = new App();