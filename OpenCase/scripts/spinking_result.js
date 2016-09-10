module.exports = {
    giveRandomKnive: function() {},

    retry: function() {
        $(".casesCarusel").children(".weapon").addClass("animated fadeOutDown");
        sleep(1000).then(() => {
            $(".casesCarusel").empty();
            spinking.newGame();
            spinking.spin();
        })
    }
};

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
