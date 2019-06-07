# 备注

> 需要设置 domain 子域名方可读取

```js
Cookie.prototype.toString = function() {
  return this.name + "=" + this.value
};

Cookie.prototype.toHeader = function() {
  var header = this.toString()

  if (this.maxAge) this.expires = new Date(Date.now() + this.maxAge);

  if (this.path     ) header += "; path=" + this.path
  if (this.expires  ) header += "; expires=" + this.expires.toUTCString()
  if (this.domain   ) header += "; domain=" + this.domain
  if (this.sameSite ) header += "; samesite=" + (this.sameSite === true ? 'strict' : this.sameSite.toLowerCase())
  if (this.secure   ) header += "; secure"
  if (this.httpOnly ) header += "; httponly"

  return header
};
```

http response headers
```js
Set-Cookie: demo=2019-06-07T08:45:34.914Z; path=/; domain=domain.com; httponly
Set-Cookie: demo.sig=g3tL-6sBd3vd40Ufvk0-kptgmRE; path=/; domain=domain.com; httponly
```

## domain.com
### set

```js
cookies.set('demo', new Date().toISOString(), { signed: true, domain: 'domain.com' })
```

### get
demo

## sub.domain.com

### set
```js
cookies.set('subdemo', new Date().toISOString(), { signed: true, domain: 'sub.domain.com' })
```

### get
demo
subdemo

## sec.sub.domain.com

### set
```js
cookies.set('secdemo', new Date().toISOString(), { signed: true, domain: 'sec.sub.domain.com' })
```

### get
demo
subdemo
secdemo