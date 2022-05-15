$(document).ready(function(){
        $(".frame").prepend(`<header>
        <h1>CV</h1>
        <ul id="nav-bar">
            <li id="home"><a href="index.html">Home</a></li>
            <li id="games"><a href="games.html">Games</a></li>
        </ul>
    </header>`);
});
$(document).ready(function(){
    $(".frame").append(`<footer>
    <hr>
    <div class="social">
        <a href="https://github.com/gio-makasa" target="_blank" rel="noopener noreferrer">
            <img src="pictures/github.jpg" alt="github" title="Github">
        </a>
    </div>
</footer>`);
});
