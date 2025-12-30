/**
 * @file date-extensions.js
 * @copyright 2026 PlasticHeart
 */

!(root => {
    /**
     * @param {number} value
     * @param {number} length
     */
    function pad0(value, length) {
        return (value + '').padStart(length, '0')
    }

    /**
     * @param {Date} date
     * @param {number} firstWeekDay
     * @returns {number}
     */
    function weekNumber(date, firstWeekDay) {
        const firstDay = new Date(date.getFullYear(), 0, 1)
        return (date.getDayOfYear() + firstDay.getDay() - firstWeekDay - 1) / 7 | 0
    }

    /**
     * @type {Object<string, function(Date): string>}
     */
    const DIRECTIVE = {
        H: x => pad0(x.getHours(), 2),
        I: x => pad0(x.getHours() % 12 || 12, 2),
        M: x => pad0(x.getMinutes(), 2),
        S: x => pad0(x.getSeconds(), 2),
        U: x => pad0(weekNumber(x, 0), 2),
        W: x => pad0(weekNumber(x, 1), 2),
        Y: x => pad0(x.getFullYear(), 4),
        d: x => pad0(x.getDate(), 2),
        f: x => pad0(x.getMilliseconds(), 3),
        j: x => pad0(x.getDayOfYear(), 3),
        m: x => pad0(x.getMonth() + 1, 2),
        w: x => pad0(x.getDay(), 1),
        y: x => pad0(x.getFullYear() % 100, 2),
        z: x => {
            const offset = -x.getTimezoneOffset()
            const hours = Math.abs(offset) / 60 | 0
            const minutes = Math.abs(offset) % 60 | 0
            return `${offset < 0 ? '-' : '+'}${pad0(hours, 2)}${pad0(minutes, 2)}`
        }
    }

    /**
     * @param {Date} other
     * @returns {number}
     */
    Date.prototype.absDiff = function (other) {
        return Math.abs(this.diff(other))
    }

    /**
     * @param {Object} options
     * @param {number?} options.years
     * @param {number?} options.months
     * @param {number?} options.days
     * @param {number?} options.hours
     * @param {number?} options.minutes
     * @param {number?} options.seconds
     * @param {number?} options.milliseconds
     * @param {number?} options.timestamp
     * @returns {Date}
     */
    Date.prototype.add = function ({ years, months, days, hours, minutes, seconds, milliseconds, timestamp } = {}) {
        const result = this.clone()
        result.setFullYear(result.getFullYear() + (years ?? 0))
        result.setMonth(result.getMonth() + (months ?? 0))
        result.setDate(result.getDate() + (days ?? 0))
        result.setHours(result.getHours() + (hours ?? 0))
        result.setMinutes(result.getMinutes() + (minutes ?? 0))
        result.setSeconds(result.getSeconds() + (seconds ?? 0))
        result.setMilliseconds(result.getMilliseconds() + (milliseconds ?? 0))
        result.setTime(result.getTime() + (timestamp ?? 0))
        return result
    }

    /**
     * @returns {Date}
     */
    Date.prototype.clone = function () {
        return new Date(this)
    }

    /**
     * @param {any} other
     * @returns {number?}
     */
    Date.prototype.compare = function (other) {
        if (other instanceof Date) {
            return isNaN(this) || isNaN(other) ? null : this - other
        }
        return false
    }

    /**
     * @param {Date} other
     * @returns {number}
     */
    Date.prototype.diff = function (other) {
        return other instanceof Date ? this - other : NaN
    }

    /**
     * @param {any} other
     * @returns {boolean}
     */
    Date.prototype.equals = function (other) {
        return other instanceof Date && +this === +other
    }

    /**
     * @param {string} format
     * @returns {string}
     */
    Date.prototype.format = function (format) {
        return format.replace(/%(.)/g, (_, x) => DIRECTIVE[x]?.(this) ?? x)
    }

    /**
     * @returns {number}
     */
    Date.prototype.getDayOfYear = function () {
        return (this - new Date(this.getFullYear(), 0, 0)) / 86400000 | 0
    }

    /**
     * @param {Object} options
     * @param {number?} options.years
     * @param {number?} options.months
     * @param {number?} options.days
     * @param {number?} options.hours
     * @param {number?} options.minutes
     * @param {number?} options.seconds
     * @param {number?} options.milliseconds
     * @param {number?} options.timestamp
     * @returns {Date}
     */
    Date.prototype.sub = function ({ years, months, days, hours, minutes, seconds, milliseconds, timestamp } = {}) {
        return this.add({
            years: -(years ?? 0),
            months: -(months ?? 0),
            days: -(days ?? 0),
            hours: -(hours ?? 0),
            minutes: -(minutes ?? 0),
            seconds: -(seconds ?? 0),
            milliseconds: -(milliseconds ?? 0),
            timestamp: -(timestamp ?? 0)
        })
    }

    /**
     * @param {Object} options
     * @param {number?} options.year
     * @param {number?} options.month
     * @param {number?} options.day
     * @param {number?} options.hour
     * @param {number?} options.minute
     * @param {number?} options.second
     * @param {number?} options.millisecond
     * @returns {Date}
     */
    Date.prototype.replace = function ({ year, month, day, hour, minute, second, millisecond } = {}) {
        return new Date(
            year ?? this.getFullYear(),
            month != null ? month - 1 : this.getMonth(),
            day ?? this.getDate(),
            hour ?? this.getHours(),
            minute ?? this.getMinutes(),
            second ?? this.getSeconds(),
            millisecond ?? this.getMilliseconds()
        )
    }

    /**
     * @returns {number}
     */
    Date.prototype.timestamp = function () {
        return +this
    }

    /**
     * @returns {{ year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number }}
     */
    Date.prototype.unpack = function () {
        return {
            year: this.getFullYear(),
            month: this.getMonth() + 1,
            day: this.getDate(),
            hour: this.getHours(),
            minute: this.getMinutes(),
            second: this.getSeconds(),
            millisecond: this.getMilliseconds()
        }
    }

    /**
     * @param {number} year
     * @param {number} month
     * @returns {number}
     */
    Date.daysInMonth = function (year, month) {
        return new Date(year, month, 0).getDate()
    }

    /**
     * @returns {Date}
     */
    Date.nan = function () {
        return new Date(NaN)
    }

    /**
     * @param {number | string | Date | null} year
     * @param {number?} month
     * @param {number?} day
     * @param {number?} hour
     * @param {number?} minute
     * @param {number?} second
     * @param {number?} millisecond
     * @returns {Date}
     */
    Date.of = function (year, month, day, hour, minute, second, millisecond) {
        if (arguments.length == 0) {
            return new Date()
        } else if (arguments.length == 1) {
            return new Date(year)
        }
        return new Date(year, month - 1, day ?? 1, hour ?? 0, minute ?? 0, second ?? 0, millisecond ?? 0)
    }
})(this)
