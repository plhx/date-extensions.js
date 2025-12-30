/**
 * @file date-extensions.test.js
 * @copyright 2026 PlasticHeart
 */

!(() => {
    /**
     * @param {T} a
     * @param {T} b
     * @returns {boolean}
     */
    function equals(a, b) {
        if (a === b) {
            return true
        } else if (typeof a == 'number' && typeof b == 'number') {
            return Number.isNaN(a) && Number.isNaN(b) || a == b
        } else if (typeof a == 'bigint' && typeof b == 'bigint') {
            return a == b
        } else if (typeof a == 'string' && typeof b == 'string') {
            return a == b
        } else if (typeof a == 'symbol' && typeof b == 'symbol') {
            return a == b
        } else if (a instanceof Date && b instanceof Date) {
            return equals(a.valueOf(), b.valueOf())
        } else if (typeof a?.equals == 'function') {
            return a.equals(b)
        } else if (typeof a?.compare == 'function') {
            return a.compare(b) == 0
        }
        return false
    }

    /**
     * @param {string} testName
     * @param {function()} action
     */
    function test(testName, action) {
        try {
            action()
            console.debug(`[UnitTest] ${testName}: OK`)
        } catch (e) {
            console.warn(`[UnitTest] ${testName}: ${e}`)
            throw e
        }
    }

    /**
     * @param {T} a
     * @param {T} b
     */
    function assertEq(a, b) {
        const result = equals(a, b)
        if (!result) {
            console.assert(result, `assertion failed: ${a} != ${b}`)
            throw new Error(`assertion failed: ${a} != ${b}`)
        }
    }

    test('Date::absDiff()', () => {
        assertEq(Date.of(2025, 1, 5).absDiff(Date.of(2025, 1, 3)), 86400000 * 2)
        assertEq(Date.of(2025, 1, 1).absDiff(Date.of(2025, 2, 1)), 86400000 * 31)
    })

    test('Date::add()', () => {
        assertEq(Date.of(2025, 1, 1).add({ years: 5 }), Date.of(2030, 1, 1))
        assertEq(Date.of(2025, 1, 1).add({ months: 13 }), Date.of(2026, 2, 1))
        assertEq(Date.of(2025, 1, 1).add({ days: 40 }), Date.of(2025, 2, 10))
        assertEq(Date.of(2025, 1, 1).add({ hours: 10 }), Date.of(2025, 1, 1, 10, 0, 0, 0))
        assertEq(Date.of(2025, 1, 1).add({ minutes: 70 }), Date.of(2025, 1, 1, 1, 10, 0, 0))
        assertEq(Date.of(2025, 1, 1).add({ seconds: -1 }), Date.of(2024, 12, 31, 23, 59, 59, 0))
        assertEq(Date.of(2025, 1, 1).add({ milliseconds: 100 }), Date.of(2025, 1, 1, 0, 0, 0, 100))
        assertEq(Date.of(2025, 1, 1).add({ timestamp: 86400000 }), Date.of(2025, 1, 2))
    })

    test('Date::diff()', () => {
        assertEq(Date.of(2025, 1, 5).diff(Date.of(2025, 1, 3)), 86400000 * 2)
        assertEq(Date.of(2025, 1, 1).diff(Date.of(2025, 2, 1)), -86400000 * 31)
    })

    test('Date::clone()', () => {
        const date1 = new Date()
        const date2 = Date.nan()
        assertEq(date1, date1.clone())
        assertEq(date2, date2.clone())
    })

    test('Date::compare()', () => {
        assertEq(Date.of(2024, 1).compare(Date.of(2025, 1)) < 0, true)
        assertEq(Date.of(2025, 1).compare(Date.of(2025, 1)) < 0, false)
        assertEq(Date.of(2026, 1).compare(Date.of(2025, 1)) < 0, false)

        assertEq(Date.of(2024, 1).compare(Date.of(2025, 1)) == 0, false)
        assertEq(Date.of(2025, 1).compare(Date.of(2025, 1)) == 0, true)
        assertEq(Date.of(2026, 1).compare(Date.of(2025, 1)) == 0, false)

        assertEq(Date.of(2024, 1).compare(Date.of(2025, 1)) > 0, false)
        assertEq(Date.of(2025, 1).compare(Date.of(2025, 1)) > 0, false)
        assertEq(Date.of(2026, 1).compare(Date.of(2025, 1)) > 0, true)

        assertEq(Date.of(2024, 1).compare(Date.nan()), null)
        assertEq(Date.of(2024, 1).compare(Date.nan()), null)
        assertEq(Date.of(2024, 1).compare(Date.nan()), null)
    })

    test('Date::daysInMonth()', () => {
        assertEq(Date.daysInMonth(2024,  2), 29)
        assertEq(Date.daysInMonth(2025,  2), 28)

        assertEq(Date.daysInMonth(2026,  1), 31)
        assertEq(Date.daysInMonth(2026,  2), 28)
        assertEq(Date.daysInMonth(2026,  3), 31)
        assertEq(Date.daysInMonth(2026,  4), 30)
        assertEq(Date.daysInMonth(2026,  5), 31)
        assertEq(Date.daysInMonth(2026,  6), 30)
        assertEq(Date.daysInMonth(2026,  7), 31)
        assertEq(Date.daysInMonth(2026,  8), 31)
        assertEq(Date.daysInMonth(2026,  9), 30)
        assertEq(Date.daysInMonth(2026, 10), 31)
        assertEq(Date.daysInMonth(2026, 11), 30)
        assertEq(Date.daysInMonth(2026, 12), 31)
    })

    test('Date::format()', () => {
        assertEq(Date.of(2025, 1, 1,  0).format('%H %I'), '00 12')
        assertEq(Date.of(2025, 1, 1,  7).format('%H %I'), '07 07')
        assertEq(Date.of(2025, 1, 1, 12).format('%H %I'), '12 12')

        assertEq(Date.of(2025, 12, 27).format('%U %W'), '51 51')
        assertEq(Date.of(2025, 12, 28).format('%U %W'), '52 51')
        assertEq(Date.of(2025, 12, 31).format('%U %W'), '52 52')
        assertEq(Date.of(2026,  1,  1).format('%U %W'), '00 00')
        assertEq(Date.of(2026,  1,  4).format('%U %W'), '01 00')
        assertEq(Date.of(2026,  1,  5).format('%U %W'), '01 01')

        assertEq(Date.of(2005,  1,  2,  3,  4,  5).format('%Y(%y)-%m-%d %H:%M:%S'), '2005(05)-01-02 03:04:05')
        assertEq(Date.of(2026, 10, 25, 13, 20, 53).format('%Y(%y)-%m-%d %H:%M:%S'), '2026(26)-10-25 13:20:53')

        assertEq(Date.of(2026, 1, 1, 0, 0, 0,  12).format('%f'), '012')
        assertEq(Date.of(2026, 1, 1, 0, 0, 0, 123).format('%f'), '123')

        assertEq(Date.of(2026,  1,  1).format('%j'), '001')
        assertEq(Date.of(2026, 12, 31).format('%j'), '365')

        assertEq(Date.of(2026, 1, 1).format('%w'), '4')
        assertEq(Date.of(2026, 1, 9).format('%w'), '5')

        {
            const date = new Date()
            const offset = -date.getTimezoneOffset()
            const sign = offset < 0 ? '-' : '+'
            const hours = (Math.abs(offset) / 60 | 0).toString().padStart(2, '0')
            const minutes = (Math.abs(offset) % 60 | 0).toString().padStart(2, '0')
            assertEq(date.format('%z'), `${sign}${hours}${minutes}`)
        }
    })

    test('Date::getDayOfYear()', () => {
        assertEq(Date.of(2026, 1, 1).getDayOfYear(), 1)
        assertEq(Date.of(2026, 12, 31).getDayOfYear(), 365)
    })

    test('Date::replace()', () => {
        const date1 = new Date().replace({
            year: 2025,
            month: 1,
            day: 2,
            hour: 3,
            minute: 4,
            second: 5,
            millisecond: 6
        })
        const date2 = Date.nan().replace({ year: 2025 })
        assertEq(date1, Date.of(2025, 1, 2, 3, 4, 5, 6))
        assertEq(date2, Date.nan())
    })

    test('Date::sub()', () => {
        assertEq(Date.of(2025, 1, 1).sub({ years: 5 }), Date.of(2020, 1, 1))
        assertEq(Date.of(2025, 1, 1).sub({ months: 5 }), Date.of(2024, 8, 1))
        assertEq(Date.of(2025, 1, 1).sub({ days: 1 }), Date.of(2024, 12, 31))
        assertEq(Date.of(2025, 1, 1).sub({ hours: -12 }), Date.of(2025, 1, 1, 12, 0, 0, 0))
        assertEq(Date.of(2025, 1, 1, 12, 30).sub({ minutes: -40 }), Date.of(2025, 1, 1, 13, 10, 0, 0))
        assertEq(Date.of(2025, 1, 1, 12, 30).sub({ seconds: -180 }), Date.of(2025, 1, 1, 12, 33, 0, 0))
        assertEq(Date.of(2025, 1, 1, 12, 30).sub({ milliseconds: -300 }), Date.of(2025, 1, 1, 12, 30, 0, 300))
        assertEq(Date.of(2025, 1, 1, 12, 30).sub({ timestamp: 3600000 }), Date.of(2025, 1, 1, 11, 30, 0, 0))
    })

    test('Date::timestamp()', () => {
        const date1 = new Date()
        const date2 = Date.nan()
        assertEq(date1.timestamp(), date1.getTime())
        assertEq(date2.timestamp(), NaN)
    })

    test('Date::unpack()', () => {
        const date = new Date()
        const { year, month, day, hour, minute, second, millisecond } = date.unpack()
        assertEq(year, date.getFullYear())
        assertEq(month, date.getMonth() + 1)
        assertEq(day, date.getDate())
        assertEq(hour, date.getHours())
        assertEq(minute, date.getMinutes())
        assertEq(second, date.getSeconds())
        assertEq(millisecond, date.getMilliseconds())
    })

    test('Date::nan()', () => {
        assertEq(isNaN(Date.nan()), true)
    })

    test('Date::of()', () => {
        assertEq(new Date(), Date.of())
        assertEq(new Date(2147483647), Date.of(2147483647))
        assertEq(new Date(2026, 0, 1), Date.of(2026, 1, 1))
        assertEq(new Date(2026, 0, 1, 12, 34, 56, 123), Date.of(2026, 1, 1, 12, 34, 56, 123))
    })
})()
