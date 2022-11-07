import React, { Component } from 'react';
import $ from 'jquery'

class Cursor extends Component {
    componentDidMount() {
        function cursor() {
            $(document).on('mousemove', function (e) {

                var xPos = e.pageX;
                var yPos = e.pageY;
                $('.circle-out').css({
                    'top': yPos,
                    'left': xPos
                });

            });
        }
        cursor()
    }
    render() {
        return (
            <div className="circle-out"></div>
        );
    }
}

export default Cursor;