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

#### `date.and(date: Date): Date`
`this` と `date` の両方が有効な場合は `date` を返します。どちらかが無効（NaN）の場合は `Date.nan()` を返します。

#### `date.clamp(low: Date, high: Date): Date`
`this` を `[low, high]` の範囲に収めた新しい `Date` を返します。

#### `date.clone(): Date`
`this` のコピーを返します。

#### `date.compare(other: any): number`
`other` が `Date` の場合、`this - other` の差（ミリ秒）を返します。そうでない場合は `NaN` を返します。

#### `date.diff(other: Date): number`
`other` との差をミリ秒で返します。`other` が `Date` でない場合は `NaN` を返します。

#### `date.equals(other: any): boolean`
`other` が同じ時刻を表す `Date` である場合に `true` を返します。

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

#### `date.getDayOfYear(): number`
年内の通算日数（1月1日 = 1）を返します。無効な `Date` の場合は `NaN` を返します。

#### `date.isLeapYear(): boolean`
うるう年であれば `true` を返します。

#### `date.isNaN(): boolean`
無効な `Date`（`Invalid Date`）であれば `true` を返します。

#### `date.map(ifValid: (date: Date) => T): Date | T`
有効な `Date` の場合は `ifValid(this)` の結果を返します。無効な場合は `this` をそのまま返します。

#### `date.max(...dates: Date[]): Date`
`this` と `dates` の中で最も新しい `Date` を返します。いずれかが無効の場合は `Date.nan()` を返します。

#### `date.min(...dates: Date[]): Date`
`this` と `dates` の中で最も古い `Date` を返します。いずれかが無効の場合は `Date.nan()` を返します。

#### `date.or(date: Date): Date`
`this` が有効な場合は `this` を、無効な場合は `date` を返します。

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

#### `date.sub(options?): Date`
指定した量を減算した新しい `Date` を返します。オプションは `add()` と同じです。

#### `date.timestamp(): number`
UNIXタイムスタンプ（ミリ秒）を返します。

#### `date.unpack(): object`
日時の各フィールドをオブジェクトとして返します。`month` は1始まりです。

```js
{ year, month, day, hour, minute, second, millisecond }
```

#### `date.xor(date: Date): Date`
`this` と `date` のどちらか一方だけが有効な場合にその有効な方を返します。両方有効または両方無効の場合は `Date.nan()` を返します。

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
