var Winter = (function(module) {
    module = module || [];
    module.chatRandomSnow = function() {
        var snow = {
            left: ['none.png','snow_left1.png','snow_left2.png','snow_left3.png','snow_left4.png','snow_left5.png'],
            mid: ['none.png','snow_mid1.png','snow_mid2.png','snow_mid3.png','snow_mid4.png','snow_mid5.png'],
            right: ['none.png','snow_right1.png','snow_right2.png','snow_right3.png','snow_right4.png','snow_right5.png']
        }
        return 'background: url(../images/winter/chat/'+snow.left[Math.rand(0, snow.left.length-1)]+'), url(../images/winter/chat/'+snow.mid[Math.rand(0, snow.mid.length-1)]+'), url(../images/winter/chat/'+snow.right[Math.rand(0, snow.right.length-1)]+'); \
                background-repeat: no-repeat; \
                background-position: top left,top center,top right;';
    }
    return module;
})(Winter || {})