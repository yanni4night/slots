/**
 * Copyright (C) 2015 yanni4night.com
 * slots.js
 *
 * changelog
 * 2015-12-21[13:39:56]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
(function (win) {
    'use strict';

    function Slots(options) {
        var candidate = options.candidate; //[[{value:,weight:}],[]]

        if (!Array.isArray(candidate) || candidate.some(function (item) {
                return !Array.isArray(item);
            })) {
            throw new Error('Candidate illegal');
        }

        this.to = function (destination, unique) {
            destination; // [{value:,},{value:,},]

        };

        this.random = function () {
            var tagged = {};

            return candidate.map(function (sequence) {
                var target;

                do {
                    target = sequence[Math.random() * sequence.length | 0];
                } while (target.value in tagged);

                tagged[target.value] = true;

                return target.value;
            });
        };

    }

    win.Slots = Slots;
})(window);