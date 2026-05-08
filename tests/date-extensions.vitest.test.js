/**
 * @file date-extensions.vitest.test.js
 * @copyright 2026 PlasticHeart
 */

import { describe, test, expect } from 'vitest'
import '../src/date-extensions.js'

describe('Date::absDiff()', () => {
    test('NaN', () => {
        expect(Date.nan().absDiff(Date.nan())).toBeNaN()
    })
    test('positive diff', () => {
        expect(+Date.of(2025, 1, 5).absDiff(Date.of(2025, 1, 3))).toBe(86400000 * 2)
    })
    test('month diff', () => {
        expect(+Date.of(2025, 1, 1).absDiff(Date.of(2025, 2, 1))).toBe(86400000 * 31)
    })
})

describe('Date::add()', () => {
    test('NaN', () => {
        expect(Date.nan().add({ years: 5 }).isNaN()).toBe(true)
    })
    test('years', () => {
        expect(+Date.of(2025, 1, 1).add({ years: 5 })).toBe(+Date.of(2030, 1, 1))
    })
    test('months overflow', () => {
        expect(+Date.of(2025, 1, 1).add({ months: 13 })).toBe(+Date.of(2026, 2, 1))
    })
    test('days', () => {
        expect(+Date.of(2025, 1, 1).add({ days: 40 })).toBe(+Date.of(2025, 2, 10))
    })
    test('hours', () => {
        expect(+Date.of(2025, 1, 1).add({ hours: 10 })).toBe(+Date.of(2025, 1, 1, 10, 0, 0, 0))
    })
    test('minutes', () => {
        expect(+Date.of(2025, 1, 1).add({ minutes: 70 })).toBe(+Date.of(2025, 1, 1, 1, 10, 0, 0))
    })
    test('negative seconds', () => {
        expect(+Date.of(2025, 1, 1).add({ seconds: -1 })).toBe(+Date.of(2024, 12, 31, 23, 59, 59, 0))
    })
    test('milliseconds', () => {
        expect(+Date.of(2025, 1, 1).add({ milliseconds: 100 })).toBe(+Date.of(2025, 1, 1, 0, 0, 0, 100))
    })
    test('timestamp', () => {
        expect(+Date.of(2025, 1, 1).add({ timestamp: 86400000 })).toBe(+Date.of(2025, 1, 2))
    })
})

describe('Date::and()', () => {
    test('valid and valid', () => {
        expect(+Date.of(2026, 1, 1).and(Date.of(2027, 1, 1))).toBe(+Date.of(2027, 1, 1))
    })
    test('NaN and valid', () => {
        expect(Date.nan().and(Date.of(2027, 1, 1)).isNaN()).toBe(true)
    })
})

describe('Date::diff()', () => {
    test('NaN diff NaN', () => {
        expect(Date.nan().diff(Date.nan())).toBeNaN()
    })
    test('valid diff NaN', () => {
        expect(Date.of(2025, 1, 1).diff(Date.nan())).toBeNaN()
    })
    test('positive diff', () => {
        expect(+Date.of(2025, 1, 5).diff(Date.of(2025, 1, 3))).toBe(86400000 * 2)
    })
    test('negative diff', () => {
        expect(+Date.of(2025, 1, 1).diff(Date.of(2025, 2, 1))).toBe(-86400000 * 31)
    })
})

describe('Date::clamp()', () => {
    test('NaN clamp', () => {
        expect(Date.nan().clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1)).isNaN()).toBe(true)
    })
    test('below range', () => {
        expect(+Date.of(2026, 1, 1).clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1))).toBe(+Date.of(2027, 1, 1))
    })
    test('within range', () => {
        expect(+Date.of(2028, 1, 1).clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1))).toBe(+Date.of(2028, 1, 1))
    })
    test('above range', () => {
        expect(+Date.of(2030, 1, 1).clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1))).toBe(+Date.of(2029, 1, 1))
    })
})

describe('Date::clone()', () => {
    test('valid clone', () => {
        const date1 = new Date()
        expect(+date1.clone()).toBe(+date1)
    })
    test('NaN clone', () => {
        expect(Date.nan().clone().isNaN()).toBe(true)
    })
})

describe('Date::compare()', () => {
    test('less than', () => {
        expect(Date.of(2024, 1).compare(Date.of(2025, 1)) < 0).toBe(true)
        expect(Date.of(2025, 1).compare(Date.of(2025, 1)) < 0).toBe(false)
        expect(Date.of(2026, 1).compare(Date.of(2025, 1)) < 0).toBe(false)
    })
    test('equal', () => {
        expect(Date.of(2024, 1).compare(Date.of(2025, 1)) == 0).toBe(false)
        expect(Date.of(2025, 1).compare(Date.of(2025, 1)) == 0).toBe(true)
        expect(Date.of(2026, 1).compare(Date.of(2025, 1)) == 0).toBe(false)
    })
    test('greater than', () => {
        expect(Date.of(2024, 1).compare(Date.of(2025, 1)) > 0).toBe(false)
        expect(Date.of(2025, 1).compare(Date.of(2025, 1)) > 0).toBe(false)
        expect(Date.of(2026, 1).compare(Date.of(2025, 1)) > 0).toBe(true)
    })
    test('compare with NaN', () => {
        expect(Date.of(2024, 1).compare(Date.nan())).toBeNaN()
        expect(Date.nan().compare(Date.nan())).toBeNaN()
    })
})

describe('Date::daysInMonth()', () => {
    test('leap year Feb', () => {
        expect(Date.daysInMonth(2024, 2)).toBe(29)
    })
    test('non-leap year Feb', () => {
        expect(Date.daysInMonth(2025, 2)).toBe(28)
    })
    test('all months of 2026', () => {
        expect(Date.daysInMonth(2026,  1)).toBe(31)
        expect(Date.daysInMonth(2026,  2)).toBe(28)
        expect(Date.daysInMonth(2026,  3)).toBe(31)
        expect(Date.daysInMonth(2026,  4)).toBe(30)
        expect(Date.daysInMonth(2026,  5)).toBe(31)
        expect(Date.daysInMonth(2026,  6)).toBe(30)
        expect(Date.daysInMonth(2026,  7)).toBe(31)
        expect(Date.daysInMonth(2026,  8)).toBe(31)
        expect(Date.daysInMonth(2026,  9)).toBe(30)
        expect(Date.daysInMonth(2026, 10)).toBe(31)
        expect(Date.daysInMonth(2026, 11)).toBe(30)
        expect(Date.daysInMonth(2026, 12)).toBe(31)
    })
})

describe('Date::format()', () => {
    test('%H %I', () => {
        expect(Date.of(2025, 1, 1,  0).format('%H %I')).toBe('00 12')
        expect(Date.of(2025, 1, 1,  7).format('%H %I')).toBe('07 07')
        expect(Date.of(2025, 1, 1, 12).format('%H %I')).toBe('12 12')
    })
    test('%U %W', () => {
        expect(Date.of(2025, 12, 27).format('%U %W')).toBe('51 52')
        expect(Date.of(2025, 12, 28).format('%U %W')).toBe('52 52')
        expect(Date.of(2025, 12, 31).format('%U %W')).toBe('52 52')
        expect(Date.of(2026,  1,  1).format('%U %W')).toBe('00 00')
        expect(Date.of(2026,  1,  4).format('%U %W')).toBe('01 01')
        expect(Date.of(2026,  1,  5).format('%U %W')).toBe('01 01')
    })
    test('%Y(%y)-%m-%d %H:%M:%S', () => {
        expect(Date.of(2005,  1,  2,  3,  4,  5).format('%Y(%y)-%m-%d %H:%M:%S')).toBe('2005(05)-01-02 03:04:05')
        expect(Date.of(2026, 10, 25, 13, 20, 53).format('%Y(%y)-%m-%d %H:%M:%S')).toBe('2026(26)-10-25 13:20:53')
    })
    test('%f milliseconds', () => {
        expect(Date.of(2026, 1, 1, 0, 0, 0,  12).format('%f')).toBe('012')
        expect(Date.of(2026, 1, 1, 0, 0, 0, 123).format('%f')).toBe('123')
    })
    test('%j day of year', () => {
        expect(Date.of(2026,  1,  1).format('%j')).toBe('001')
        expect(Date.of(2026, 12, 31).format('%j')).toBe('365')
    })
    test('%w day of week', () => {
        expect(Date.of(2026, 1, 1).format('%w')).toBe('4')
        expect(Date.of(2026, 1, 9).format('%w')).toBe('5')
    })
    test('%z timezone offset', () => {
        const date = new Date()
        const offset = -date.getTimezoneOffset()
        const sign = offset < 0 ? '-' : '+'
        const hours = (Math.abs(offset) / 60 | 0).toString().padStart(2, '0')
        const minutes = (Math.abs(offset) % 60 | 0).toString().padStart(2, '0')
        expect(date.format('%z')).toBe(`${sign}${hours}${minutes}`)
    })
})

describe('Date::getDayOfYear()', () => {
    test('NaN', () => {
        expect(Date.nan().getDayOfYear()).toBeNaN()
    })
    test('Jan 1', () => {
        expect(Date.of(2026, 1, 1).getDayOfYear()).toBe(1)
    })
    test('Dec 31', () => {
        expect(Date.of(2026, 12, 31).getDayOfYear()).toBe(365)
    })
})

describe('Date::isLeapYear()', () => {
    test('leap year checks', () => {
        expect(Date.nan().isLeapYear()).toBe(false)
        expect(Date.of(1900, 1, 1).isLeapYear()).toBe(false)
        expect(Date.of(2000, 1, 1).isLeapYear()).toBe(true)
        expect(Date.of(2023, 1, 1).isLeapYear()).toBe(false)
        expect(Date.of(2024, 1, 1).isLeapYear()).toBe(true)
        expect(Date.of(2025, 1, 1).isLeapYear()).toBe(false)
        expect(Date.of(2028, 1, 1).isLeapYear()).toBe(true)
        expect(Date.of(2100, 1, 1).isLeapYear()).toBe(false)
        expect(Date.of(2400, 1, 1).isLeapYear()).toBe(true)
    })
})

describe('Date::isNaN()', () => {
    test('valid date', () => {
        expect(Date.of(2026, 1, 1).isNaN()).toBe(false)
    })
    test('NaN date', () => {
        expect(Date.nan().isNaN()).toBe(true)
    })
})

describe('Date::map()', () => {
    test('valid maps to value', () => {
        expect(Date.of(2026, 1, 1).map(_ => 42)).toBe(42)
    })
    test('NaN stays NaN', () => {
        expect(Date.nan().map(_ => 42).isNaN()).toBe(true)
    })
})

describe('Date::max()', () => {
    test('NaN max', () => {
        expect(Date.nan().max(Date.of(2027, 1, 1)).isNaN()).toBe(true)
    })
    test('two dates', () => {
        expect(+Date.of(2026, 1, 1).max(Date.of(2027, 1, 1))).toBe(+Date.of(2027, 1, 1))
    })
    test('three dates', () => {
        expect(+Date.of(2026, 1, 1).max(Date.of(2027, 1, 1), Date.of(2028, 1, 1))).toBe(+Date.of(2028, 1, 1))
    })
})

describe('Date::min()', () => {
    test('NaN min', () => {
        expect(Date.nan().min(Date.of(2027, 1, 1)).isNaN()).toBe(true)
    })
    test('two dates', () => {
        expect(+Date.of(2026, 1, 1).min(Date.of(2027, 1, 1))).toBe(+Date.of(2026, 1, 1))
    })
    test('three dates', () => {
        expect(+Date.of(2026, 1, 1).min(Date.of(2027, 1, 1), Date.of(2028, 1, 1))).toBe(+Date.of(2026, 1, 1))
    })
})

describe('Date::or()', () => {
    test('valid or valid', () => {
        expect(+Date.of(2026, 1, 1).or(Date.of(2027, 1, 1))).toBe(+Date.of(2026, 1, 1))
    })
    test('NaN or valid', () => {
        expect(+Date.nan().or(Date.of(2027, 1, 1))).toBe(+Date.of(2027, 1, 1))
    })
})

describe('Date::replace()', () => {
    test('replace all fields', () => {
        const date1 = new Date().replace({
            year: 2025,
            month: 1,
            day: 2,
            hour: 3,
            minute: 4,
            second: 5,
            millisecond: 6
        })
        expect(+date1).toBe(+Date.of(2025, 1, 2, 3, 4, 5, 6))
    })
    test('NaN replace', () => {
        expect(Date.nan().replace({ year: 2025 }).isNaN()).toBe(true)
    })
})

describe('Date::sub()', () => {
    test('NaN', () => {
        expect(Date.nan().sub({ years: 5 }).isNaN()).toBe(true)
    })
    test('years', () => {
        expect(+Date.of(2025, 1, 1).sub({ years: 5 })).toBe(+Date.of(2020, 1, 1))
    })
    test('months', () => {
        expect(+Date.of(2025, 1, 1).sub({ months: 5 })).toBe(+Date.of(2024, 8, 1))
    })
    test('days', () => {
        expect(+Date.of(2025, 1, 1).sub({ days: 1 })).toBe(+Date.of(2024, 12, 31))
    })
    test('negative hours', () => {
        expect(+Date.of(2025, 1, 1).sub({ hours: -12 })).toBe(+Date.of(2025, 1, 1, 12, 0, 0, 0))
    })
    test('negative minutes', () => {
        expect(+Date.of(2025, 1, 1, 12, 30).sub({ minutes: -40 })).toBe(+Date.of(2025, 1, 1, 13, 10, 0, 0))
    })
    test('negative seconds', () => {
        expect(+Date.of(2025, 1, 1, 12, 30).sub({ seconds: -180 })).toBe(+Date.of(2025, 1, 1, 12, 33, 0, 0))
    })
    test('negative milliseconds', () => {
        expect(+Date.of(2025, 1, 1, 12, 30).sub({ milliseconds: -300 })).toBe(+Date.of(2025, 1, 1, 12, 30, 0, 300))
    })
    test('timestamp', () => {
        expect(+Date.of(2025, 1, 1, 12, 30).sub({ timestamp: 3600000 })).toBe(+Date.of(2025, 1, 1, 11, 30, 0, 0))
    })
})

describe('Date::timestamp()', () => {
    test('valid', () => {
        const date1 = new Date()
        expect(date1.timestamp()).toBe(date1.getTime())
    })
    test('NaN', () => {
        expect(Date.nan().timestamp()).toBeNaN()
    })
})

describe('Date::unpack()', () => {
    test('valid date', () => {
        const date = new Date()
        const { year, month, day, hour, minute, second, millisecond } = date.unpack()
        expect(year).toBe(date.getFullYear())
        expect(month).toBe(date.getMonth() + 1)
        expect(day).toBe(date.getDate())
        expect(hour).toBe(date.getHours())
        expect(minute).toBe(date.getMinutes())
        expect(second).toBe(date.getSeconds())
        expect(millisecond).toBe(date.getMilliseconds())
    })
    test('NaN date', () => {
        const { year, month, day, hour, minute, second, millisecond } = Date.nan().unpack()
        expect(year).toBeNaN()
        expect(month).toBeNaN()
        expect(day).toBeNaN()
        expect(hour).toBeNaN()
        expect(minute).toBeNaN()
        expect(second).toBeNaN()
        expect(millisecond).toBeNaN()
    })
})

describe('Date::xor()', () => {
    test('valid xor valid', () => {
        expect(Date.of(2026, 1, 1).xor(Date.of(2027, 1, 1)).isNaN()).toBe(true)
    })
    test('valid xor NaN', () => {
        expect(+Date.of(2026, 1, 1).xor(Date.nan())).toBe(+Date.of(2026, 1, 1))
    })
    test('NaN xor valid', () => {
        expect(+Date.nan().xor(Date.of(2027, 1, 1))).toBe(+Date.of(2027, 1, 1))
    })
    test('NaN xor NaN', () => {
        expect(Date.nan().xor(Date.nan()).isNaN()).toBe(true)
    })
})

describe('Date::nan()', () => {
    test('isNaN', () => {
        expect(isNaN(Date.nan())).toBe(true)
    })
})

describe('Date::of()', () => {
    test('no args returns current time approximately', () => {
        expect(Math.abs(+Date.of() - +new Date()) < 100).toBe(true)
    })
    test('timestamp', () => {
        expect(+Date.of(2147483647)).toBe(+new Date(2147483647))
    })
    test('year month day', () => {
        expect(+Date.of(2026, 1, 1)).toBe(+new Date(2026, 0, 1))
    })
    test('full args', () => {
        expect(+Date.of(2026, 1, 1, 12, 34, 56, 123)).toBe(+new Date(2026, 0, 1, 12, 34, 56, 123))
    })
})
