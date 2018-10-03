
    const QNT_INICIAL = 10;
    const CARREGA_QNT = 10;
    const CARREGA_EM  = 100; // px

    var lastId = 1;
    
    function Card() {
        this.id = "el" + lastId++;
        this.post = Card.lastShown++;

        this.element = document.createElement("div");
        this.element.classList.add("item");
        this.element.innerText = "Carregando...";
    }

    Card.lastShown = 1;
    // Ao acontecer o evento de scroll, a funcao Card.Scroll será disparada
    Card.init = function() {
        window.addEventListener("scroll", Card.onScroll);
        Card.mostraNCards(QNT_INICIAL);
        Card.onScroll();
    };

    Card.onScroll = function() {
        let html = document.body.parentElement;
        let scrollBottom = html.scrollTop + html.clientHeight;

        if(Math.abs(scrollBottom - html.scrollHeight) < CARREGA_EM)
            Card.mostraNCards(CARREGA_QNT);
    };

    Card.mostraNCards = function(n) {
        let wrapper = document.querySelector(".wrapper");
        for(let i = 0; i < n; i++)
            new Card().appendTo(wrapper);
    };

    Card.prototype.onLoad = function(post) {
        this.element.innerText = post.title;
    };

    Card.prototype.appendTo = function(element) {
        element.appendChild(this.element);
        fetch("https://jsonplaceholder.typicode.com/posts/" + this.post)
        .then(r => r.json())
        .then(post => this.onLoad(post));

        return this;
    };

    // Encapsula a chamada do método Init em uma função anonima
    (() => {
        Card.init();
    })();
