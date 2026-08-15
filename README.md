# date-extensions.js

[Date](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)オブジェクトに追加の便利メソッドを追加するモジュールです。

## CDNからの利用

```html
<script src="https://js.plasticheart.info/date-extensions/latest/date-extensions.min.js"></script>
```

## 追加されるメソッド

### インスタンスメソッド

#### `date.absDiff(other: Date): number`
`other` との差の絶対値をミリ秒で返します。

```js
Date.of(2025, 1, 5).absDiff(Date.of(2025, 1, 3)) // => 172800000
Date.of(2025, 1, 3).absDiff(Date.of(2025, 1, 5)) // => 172800000
```

#### `date.add(options?): Date`
指定した量を加算した新しい `Date` を返します。元のオブジェクトは変更しません。

| オプション | 型 | 説明 |
|---|---|---|
| `years` | `number` | 年 |
| `months` | `number` | 月 |
| `days` | `number` | 日 |
| `hours` | `number` | 時 |
| `minutes` | `number` | 分 |
| `seconds` | `number` | 秒 |
| `milliseconds` | `number` | ミリ秒 |
| `timestamp` | `number` | タイムスタンプ（ミリ秒） |

```js
Date.of(2025, 1, 1).add({ years: 5 })  // => 2030年1月1日
Date.of(2025, 1, 1).add({ days: 40 })  // => 2025年2月10日
Date.of(2025, 1, 1).add({ hours: 10 }) // => 2025年1月1日 10:00:00
```

#### `date.and(date: Date): Date`
`this` と `date` の両方が有効な場合は `date` を返します。どちらかが無効（NaN）の場合は `Date.nan()` を返します。

```js
Date.of(2026, 1, 1).and(Date.of(2027, 1, 1))    // => 2027年1月1日
Date.nan().and(Date.of(2027, 1, 1)).isNaN()     // => true
```

#### `date.clamp(low: Date, high: Date): Date`
`this` を `[low, high]` の範囲に収めた新しい `Date` を返します。

```js
Date.of(2026, 1, 1).clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1)) // => 2027年1月1日
Date.of(2028, 1, 1).clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1)) // => 2028年1月1日
Date.of(2030, 1, 1).clamp(Date.of(2027, 1, 1), Date.of(2029, 1, 1)) // => 2029年1月1日
```

#### `date.clone(): Date`
`this` のコピーを返します。

```js
const date = Date.of(2026, 1, 1)
const cloned = date.clone()
cloned.equals(date) // => true
cloned === date      // => false
```

#### `date.compare(other: any): number`
`other` が `Date` の場合、`this - other` の差（ミリ秒）を返します。そうでない場合は `NaN` を返します。

```js
Date.of(2024, 1, 1).compare(Date.of(2025, 1, 1)) // => -31622400000
Date.of(2025, 1, 1).compare(Date.of(2025, 1, 1)) // => 0
Date.of(2026, 1, 1).compare(Date.of(2025, 1, 1)) // => 31536000000
```

#### `date.diff(other: Date): number`
`other` との差をミリ秒で返します。`other` が `Date` でない場合は `NaN` を返します。

```js
Date.of(2025, 1, 5).diff(Date.of(2025, 1, 3)) // => 172800000
Date.of(2025, 1, 1).diff(Date.of(2025, 2, 1)) // => -2678400000
```

#### `date.equals(other: any): boolean`
`other` が同じ時刻を表す `Date` である場合に `true` を返します。

```js
Date.of(2026, 1, 1).equals(Date.of(2026, 1, 1)) // => true
Date.of(2026, 1, 1).equals(Date.of(2027, 1, 1)) // => false
```

#### `date.format(format: string): string`
フォーマット文字列に従って日時を文字列に変換します。`%` に続くディレクティブが置換されます。

| ディレクティブ | 説明 | 例 |
|---|---|---|
| `%H` | 時（24時間、0埋め2桁） | `07`, `23` |
| `%I` | 時（12時間、0埋め2桁） | `07`, `11` |
| `%M` | 分（0埋め2桁） | `05`, `59` |
| `%S` | 秒（0埋め2桁） | `00`, `59` |
| `%U` | 週番号・日曜始まり（0埋め2桁、第0週あり） | `00`, `52` |
| `%W` | 週番号・月曜始まり（0埋め2桁、第0週あり） | `00`, `53` |
| `%Y` | 西暦（0埋め4桁） | `2026` |
| `%y` | 西暦下2桁（0埋め） | `26` |
| `%m` | 月（0埋め2桁） | `01`, `12` |
| `%d` | 日（0埋め2桁） | `01`, `31` |
| `%f` | ミリ秒（0埋め3桁） | `012`, `999` |
| `%j` | 年内の通算日（0埋め3桁） | `001`, `365` |
| `%w` | 曜日（0=日曜〜6=土曜） | `0`, `6` |
| `%z` | UTCオフセット | `+0900`, `-0500` |

```js
Date.of(2026, 10, 25, 13, 20, 53).format('%Y-%m-%d %H:%M:%S') // => '2026-10-25 13:20:53'
Date.of(2026, 1, 1).format('%j')                               // => '001'
```

#### `date.getDayOfYear(): number`
年内の通算日数（1月1日 = 1）を返します。無効な `Date` の場合は `NaN` を返します。

```js
Date.of(2026, 1, 1).getDayOfYear()   // => 1
Date.of(2026, 12, 31).getDayOfYear() // => 365
```

#### `date.isLeapYear(): boolean`
うるう年であれば `true` を返します。

```js
Date.of(2024, 1, 1).isLeapYear() // => true
Date.of(2025, 1, 1).isLeapYear() // => false
```

#### `date.isNaN(): boolean`
無効な `Date`（`Invalid Date`）であれば `true` を返します。

```js
Date.of(2026, 1, 1).isNaN() // => false
Date.nan().isNaN()          // => true
```

#### `date.map(ifValid: (date: Date) => T): Date | T`
有効な `Date` の場合は `ifValid(this)` の結果を返します。無効な場合は `this` をそのまま返します。

```js
Date.of(2026, 1, 1).map(date => date.getFullYear())  // => 2026
Date.nan().map(date => date.getFullYear()).isNaN()   // => true
```

#### `date.max(...dates: Date[]): Date`
`this` と `dates` の中で最も新しい `Date` を返します。いずれかが無効の場合は `Date.nan()` を返します。

```js
Date.of(2026, 1, 1).max(Date.of(2027, 1, 1))               // => 2027年1月1日
Date.of(2026, 1, 1).max(Date.of(2027, 1, 1), Date.of(2028, 1, 1)) // => 2028年1月1日
Date.nan().max(Date.of(2027, 1, 1)).isNaN()                 // => true
```

#### `date.min(...dates: Date[]): Date`
`this` と `dates` の中で最も古い `Date` を返します。いずれかが無効の場合は `Date.nan()` を返します。

```js
Date.of(2026, 1, 1).min(Date.of(2027, 1, 1))               // => 2026年1月1日
Date.of(2026, 1, 1).min(Date.of(2027, 1, 1), Date.of(2028, 1, 1)) // => 2026年1月1日
Date.nan().min(Date.of(2027, 1, 1)).isNaN()                 // => true
```

#### `date.or(date: Date): Date`
`this` が有効な場合は `this` を、無効な場合は `date` を返します。

```js
Date.of(2026, 1, 1).or(Date.of(2027, 1, 1)) // => 2026年1月1日
Date.nan().or(Date.of(2027, 1, 1))          // => 2027年1月1日
```

#### `date.replace(options?): Date`
指定したフィールドだけを置き換えた新しい `Date` を返します。`month` は1始まりです。

| オプション | 型 | 説明 |
|---|---|---|
| `year` | `number` | 年 |
| `month` | `number` | 月（1〜12） |
| `day` | `number` | 日 |
| `hour` | `number` | 時 |
| `minute` | `number` | 分 |
| `second` | `number` | 秒 |
| `millisecond` | `number` | ミリ秒 |

```js
Date.of(2025, 1, 1, 3, 4, 5).replace({ year: 2026, month: 12 }) // => 2026年12月1日 03:04:05
```

#### `date.sub(options?): Date`
指定した量を減算した新しい `Date` を返します。オプションは `add()` と同じです。

```js
Date.of(2025, 1, 1).sub({ years: 5 })  // => 2020年1月1日
Date.of(2025, 1, 1).sub({ months: 5 }) // => 2024年8月1日
```

#### `date.timestamp(): number`
UNIXタイムスタンプ（ミリ秒）を返します。

```js
const date = Date.of(2026, 1, 1)
date.timestamp() // => date.getTime() と同じ値
```

#### `date.unpack(): object`
日時の各フィールドをオブジェクトとして返します。`month` は1始まりです。

```js
{ year, month, day, hour, minute, second, millisecond }
```

```js
Date.of(2026, 3, 4, 5, 6, 7, 8).unpack()
// => { year: 2026, month: 3, day: 4, hour: 5, minute: 6, second: 7, millisecond: 8 }
```

#### `date.xor(date: Date): Date`
`this` と `date` のどちらか一方だけが有効な場合にその有効な方を返します。両方有効または両方無効の場合は `Date.nan()` を返します。

```js
Date.of(2026, 1, 1).xor(Date.of(2027, 1, 1)).isNaN() // => true
Date.of(2026, 1, 1).xor(Date.nan())                   // => 2026年1月1日
Date.nan().xor(Date.of(2027, 1, 1))                   // => 2027年1月1日
```

---

### 静的メソッド

#### `Date.daysInMonth(year: number, month: number): number`
指定した年・月の日数を返します。`month` は1始まりです。

```js
Date.daysInMonth(2024, 2) // => 29
Date.daysInMonth(2025, 2) // => 28
```

#### `Date.nan(): Date`
無効な `Date`（`Invalid Date`）を返します。

```js
Date.nan().isNaN() // => true
```

#### `Date.of(year?, month?, day?, hour?, minute?, second?, millisecond?): Date`
引数なしで現在時刻、引数1つでタイムスタンプ・文字列・`Date` から生成します。引数2つ以上の場合は年月日時分秒ミリ秒を指定します。`month` は1始まりです。

```js
Date.of()                          // 現在時刻
Date.of(2147483647)                // タイムスタンプから生成
Date.of(2026, 1, 1)                // 2026年1月1日
Date.of(2026, 1, 1, 12, 34, 56)   // 2026年1月1日 12:34:56
```
