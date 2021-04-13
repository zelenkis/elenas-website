(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: s,
              _unsubscribe: i,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(i)) {
              s && (this._unsubscribe = void 0);
              try {
                i.call(this);
              } catch (a) {
                e = a instanceof u ? d(a.errors) : [a];
              }
            }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (e = e || []),
                      a instanceof u ? (e = e.concat(d(a.errors))) : e.push(a);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const f = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class p extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof p
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [f]() {
          return this;
        }
        static create(t, e, n) {
          const r = new p(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends p {
        constructor(t, e, n, s) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function _(t) {
        return t;
      }
      let y = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof p) return t;
                  if (t[f]) return t[f]();
                }
                return t || e || n ? new p(t, e, n) : new p(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof p ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = v(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? _
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = v(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function v(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const b = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class C extends p {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let x = (() => {
        class t extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [f]() {
            return new C(this);
          }
          lift(t) {
            const e = new S(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new b();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new b();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new b();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new b();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new b();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new S(t, e)), t;
      })();
      class S extends x {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function E(t) {
        return t && "function" == typeof t.schedule;
      }
      function O(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new T(t, e));
        };
      }
      class T {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new k(t, this.project, this.thisArg));
        }
      }
      class k extends p {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const P = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function A() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const R = A(),
        I = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function M(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const j = (t) => {
        if (t && "function" == typeof t[m])
          return (
            (r = t),
            (t) => {
              const e = r[m]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (I(t)) return P(t);
        if (M(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[R])
          return (
            (e = t),
            (t) => {
              const n = e[R]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (r) {
                  return t.error(r), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, r;
      };
      function D(t, e) {
        return new y((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function U(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new y((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (M(t))
                  return (function (t, e) {
                    return new y((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (I(t)) return D(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[R];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new y((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[R]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof y
          ? t
          : new y(j(t));
      }
      class N extends p {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class H extends p {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function F(t, e) {
        if (!e.closed) return t instanceof y ? t.subscribe(e) : j(t)(e);
      }
      function L(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                L((n, r) => U(t(n, r)).pipe(O((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new V(t, n)));
      }
      class V {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent));
        }
      }
      class $ extends H {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new N(this),
            n = this.destination;
          n.add(e);
          const r = F(t, e);
          r !== e && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function z(t = Number.POSITIVE_INFINITY) {
        return L(_, t);
      }
      function B(t, e) {
        return e ? D(t, e) : new y(P(t));
      }
      function q() {
        return function (t) {
          return t.lift(new W(t));
        };
      }
      class W {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new G(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class G extends p {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class Z extends y {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new J(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return q()(this);
        }
      }
      const Q = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class J extends C {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function K() {
        return new x();
      }
      function Y(t) {
        for (let e in t) if (t[e] === Y) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function X(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(X).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function tt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const et = Y({ __forward_ref__: Y });
      function nt(t) {
        return (
          (t.__forward_ref__ = nt),
          (t.toString = function () {
            return X(this());
          }),
          t
        );
      }
      function rt(t) {
        return "function" == typeof (e = t) &&
          e.hasOwnProperty(et) &&
          e.__forward_ref__ === nt
          ? t()
          : t;
        var e;
      }
      class st extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function it(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function ot(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : it(t);
      }
      function at(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new st("201", `No provider for ${ot(t)} found${n}`);
      }
      function lt(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ct(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function ut(t) {
        return ht(t, ft) || ht(t, gt);
      }
      function ht(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function dt(t) {
        return t && (t.hasOwnProperty(pt) || t.hasOwnProperty(mt))
          ? t[pt]
          : null;
      }
      const ft = Y({ "\u0275prov": Y }),
        pt = Y({ "\u0275inj": Y }),
        gt = Y({ ngInjectableDef: Y }),
        mt = Y({ ngInjectorDef: Y });
      var _t = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      let yt;
      function vt(t) {
        const e = yt;
        return (yt = t), e;
      }
      function bt(t, e, n) {
        const r = ut(t);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & _t.Optional
          ? null
          : void 0 !== e
          ? e
          : void at(X(t), "Injector");
      }
      function wt(t) {
        return { toString: t }.toString();
      }
      var Ct = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        xt = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const St = "undefined" != typeof globalThis && globalThis,
        Et = "undefined" != typeof window && window,
        Ot =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Tt = "undefined" != typeof global && global,
        kt = St || Tt || Et || Ot,
        Pt = {},
        At = [],
        Rt = Y({ "\u0275cmp": Y }),
        It = Y({ "\u0275dir": Y }),
        Mt = Y({ "\u0275pipe": Y }),
        jt = Y({ "\u0275mod": Y }),
        Dt = Y({ "\u0275loc": Y }),
        Ut = Y({ "\u0275fac": Y }),
        Nt = Y({ __NG_ELEMENT_ID__: Y });
      let Ht = 0;
      function Ft(t) {
        return wt(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Ct.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || At,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || xt.Emulated,
              id: "c",
              styles: t.styles || At,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            i = t.pipes;
          return (
            (n.id += Ht++),
            (n.inputs = Bt(t.inputs, e)),
            (n.outputs = Bt(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(Lt)
              : null),
            (n.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Vt)
              : null),
            n
          );
        });
      }
      function Lt(t) {
        return (
          Gt(t) ||
          (function (t) {
            return t[It] || null;
          })(t)
        );
      }
      function Vt(t) {
        return (function (t) {
          return t[Mt] || null;
        })(t);
      }
      const $t = {};
      function zt(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || At,
          declarations: t.declarations || At,
          imports: t.imports || At,
          exports: t.exports || At,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            wt(() => {
              $t[t.id] = t.type;
            }),
          e
        );
      }
      function Bt(t, e) {
        if (null == t) return Pt;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i);
          }
        return n;
      }
      const qt = Ft;
      function Wt(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function Gt(t) {
        return t[Rt] || null;
      }
      function Zt(t, e) {
        const n = t[jt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${X(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Qt = 20,
        Jt = 10;
      function Kt(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Yt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Xt(t) {
        return 0 != (8 & t.flags);
      }
      function te(t) {
        return 2 == (2 & t.flags);
      }
      function ee(t) {
        return 1 == (1 & t.flags);
      }
      function ne(t) {
        return null !== t.template;
      }
      function re(t, e) {
        return t.hasOwnProperty(Ut) ? t[Ut] : null;
      }
      class se {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ie() {
        const t = ae(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === Pt) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function oe(t, e, n, r) {
        const s =
            ae(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: Pt, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new se(l && l.currentValue, e, o === Pt)), (t[r] = e);
      }
      function ae(t) {
        return t.__ngSimpleChanges__ || null;
      }
      let le;
      function ce(t) {
        return !!t.listen;
      }
      const ue = {
        createRenderer: (t, e) =>
          void 0 !== le
            ? le
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function he(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function de(t, e) {
        return he(e[t]);
      }
      function fe(t, e) {
        return he(e[t.index]);
      }
      function pe(t, e) {
        return t.data[e];
      }
      function ge(t, e) {
        const n = e[t];
        return Kt(n) ? n : n[0];
      }
      function me(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function _e(t) {
        return 128 == (128 & t[2]);
      }
      function ye(t, e) {
        return null == e ? null : t[e];
      }
      function ve(t) {
        t[18] = 0;
      }
      function be(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const we = {
        lFrame: Ve(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Ce() {
        return we.bindingsEnabled;
      }
      function xe() {
        return we.lFrame.lView;
      }
      function Se() {
        return we.lFrame.tView;
      }
      function Ee() {
        let t = Oe();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Oe() {
        return we.lFrame.currentTNode;
      }
      function Te(t, e) {
        const n = we.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function ke() {
        return we.lFrame.isParent;
      }
      function Pe() {
        return we.isInCheckNoChangesMode;
      }
      function Ae(t) {
        we.isInCheckNoChangesMode = t;
      }
      function Re() {
        const t = we.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function Ie() {
        return we.lFrame.bindingIndex++;
      }
      function Me(t) {
        const e = we.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function je(t, e) {
        const n = we.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), De(e);
      }
      function De(t) {
        we.lFrame.currentDirectiveIndex = t;
      }
      function Ue(t) {
        we.lFrame.currentQueryIndex = t;
      }
      function Ne(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function He(t, e, n) {
        if (n & _t.SkipSelf) {
          let r = e,
            s = t;
          for (
            ;
            (r = r.parent),
              !(
                null !== r ||
                n & _t.Host ||
                ((r = Ne(s)), null === r) ||
                ((s = s[15]), 10 & r.type)
              );

          );
          if (null === r) return !1;
          (e = r), (t = s);
        }
        const r = (we.lFrame = Le());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function Fe(t) {
        const e = Le(),
          n = t[1];
        (we.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Le() {
        const t = we.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Ve(t) : e;
      }
      function Ve(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function $e() {
        const t = we.lFrame;
        return (
          (we.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const ze = $e;
      function Be() {
        const t = $e();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function qe() {
        return we.lFrame.selectedIndex;
      }
      function We(t) {
        we.lFrame.selectedIndex = t;
      }
      function Ge() {
        const t = we.lFrame;
        return pe(t.tView, t.selectedIndex);
      }
      function Ze(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function Qe(t, e, n) {
        Ye(t, e, 3, n);
      }
      function Je(t, e, n, r) {
        (3 & t[2]) === n && Ye(t, e, n, r);
      }
      function Ke(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function Ye(t, e, n, r) {
        const s = null != r ? r : -1,
          i = e.length - 1;
        let o = 0;
        for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++)
          if ("number" == typeof e[a + 1]) {
            if (((o = e[a]), null != r && o >= r)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < s || -1 == s) &&
                (Xe(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function Xe(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), i.call(o))
          : i.call(o);
      }
      const tn = -1;
      class en {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function nn(t, e, n) {
        const r = ce(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++s];
            sn(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function rn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function sn(t) {
        return 64 === t.charCodeAt(0);
      }
      function on(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                an(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function an(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function ln(t) {
        return t !== tn;
      }
      function cn(t) {
        return 32767 & t;
      }
      function un(t, e) {
        let n = t >> 16,
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let hn = !0;
      function dn(t) {
        const e = hn;
        return (hn = t), e;
      }
      let fn = 0;
      function pn(t, e) {
        const n = mn(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          gn(r.data, t),
          gn(e, null),
          gn(r.blueprint, null));
        const s = _n(t, e),
          i = t.injectorIndex;
        if (ln(s)) {
          const t = cn(s),
            n = un(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
        }
        return (e[i + 8] = s), i;
      }
      function gn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function mn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function _n(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          s = e;
        for (; null !== s; ) {
          const t = s[1],
            e = t.type;
          if (((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === r))
            return tn;
          if ((n++, (s = s[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return tn;
      }
      function yn(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Nt) && (r = n[Nt]),
            null == r && (r = n[Nt] = fn++);
          const s = 255 & r;
          e.data[t + (s >> 5)] |= 1 << s;
        })(t, e, n);
      }
      function vn(t, e, n) {
        if (n & _t.Optional) return t;
        at(e, "NodeInjector");
      }
      function bn(t, e, n, r) {
        if (
          (n & _t.Optional && void 0 === r && (r = null),
          0 == (n & (_t.Self | _t.Host)))
        ) {
          const s = t[9],
            i = vt(void 0);
          try {
            return s ? s.get(e, r, n & _t.Optional) : bt(e, r, n & _t.Optional);
          } finally {
            vt(i);
          }
        }
        return vn(r, e, n);
      }
      function wn(t, e, n, r = _t.Default, s) {
        if (null !== t) {
          const i = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Nt) ? t[Nt] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : xn) : e;
          })(n);
          if ("function" == typeof i) {
            if (!He(e, t, r)) return r & _t.Host ? vn(s, n, r) : bn(e, n, r, s);
            try {
              const t = i();
              if (null != t || r & _t.Optional) return t;
              at(n);
            } finally {
              ze();
            }
          } else if ("number" == typeof i) {
            let s = null,
              o = mn(t, e),
              a = tn,
              l = r & _t.Host ? e[16][6] : null;
            for (
              (-1 === o || r & _t.SkipSelf) &&
              ((a = -1 === o ? _n(t, e) : e[o + 8]),
              a !== tn && Tn(r, !1)
                ? ((s = e[1]), (o = cn(a)), (e = un(a, e)))
                : (o = -1));
              -1 !== o;

            ) {
              const t = e[1];
              if (On(i, o, t.data)) {
                const t = Sn(o, e, n, s, r, l);
                if (t !== Cn) return t;
              }
              (a = e[o + 8]),
                a !== tn && Tn(r, e[1].data[o + 8] === l) && On(i, o, e)
                  ? ((s = t), (o = cn(a)), (e = un(a, e)))
                  : (o = -1);
            }
          }
        }
        return bn(e, n, r, s);
      }
      const Cn = {};
      function xn() {
        return new kn(Ee(), xe());
      }
      function Sn(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = (function (t, e, n, r, s) {
            const i = t.providerIndexes,
              o = e.data,
              a = 1048575 & i,
              l = t.directiveStart,
              c = i >> 20,
              u = s ? a + c : t.directiveEnd;
            for (let h = r ? a : a + c; h < u; h++) {
              const t = o[h];
              if ((h < l && n === t) || (h >= l && t.type === n)) return h;
            }
            if (s) {
              const t = o[l];
              if (t && ne(t) && t.type === n) return l;
            }
            return null;
          })(
            a,
            o,
            n,
            null == r ? te(a) && hn : r != o && 0 != (3 & a.type),
            s & _t.Host && i === a
          );
        return null !== l ? En(e, o, l, a) : Cn;
      }
      function En(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (s instanceof en) {
          const o = s;
          o.resolving &&
            (function (t, e) {
              throw new st(
                "200",
                `Circular dependency in DI detected for ${t}`
              );
            })(ot(i[n]));
          const a = dn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? vt(o.injectImpl) : null;
          He(t, r, _t.Default);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: s,
                    ngDoCheck: i,
                  } = e.type.prototype;
                  if (r) {
                    const r =
                      ((o = e).type.prototype.ngOnChanges && (o.setInput = oe),
                      ie);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r);
                  }
                  var o;
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== l && vt(l), dn(a), (o.resolving = !1), ze();
          }
        }
        return s;
      }
      function On(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function Tn(t, e) {
        return !(t & _t.Self || (t & _t.Host && e));
      }
      class kn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return wn(this._tNode, this._lView, t, void 0, e);
        }
      }
      const Pn = "__parameters__";
      function An(t, e, n) {
        return wt(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty(Pn)
                ? t[Pn]
                : Object.defineProperty(t, Pn, { value: [] })[Pn];
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      class Rn {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = lt({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const In = new Rn("AnalyzeForEntryComponents"),
        Mn = Function;
      function jn(t, e) {
        t.forEach((t) => (Array.isArray(t) ? jn(t, e) : e(t)));
      }
      function Dn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Un(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function Nn(t, e, n) {
        let r = Fn(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let s = t.length;
                if (s == e) t.push(n, r);
                else if (1 === s) t.push(r, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function Hn(t, e) {
        const n = Fn(t, e);
        if (n >= 0) return t[1 | n];
      }
      function Fn(t, e) {
        return (function (t, e, n) {
          let r = 0,
            s = t.length >> 1;
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (s = n) : (r = n + 1);
          }
          return ~(s << 1);
        })(t, e);
      }
      const Ln = {},
        Vn = /\n/gm,
        $n = "__source",
        zn = Y({ provide: String, useValue: Y });
      let Bn;
      function qn(t) {
        const e = Bn;
        return (Bn = t), e;
      }
      function Wn(t, e = _t.Default) {
        if (void 0 === Bn)
          throw new Error("inject() must be called from an injection context");
        return null === Bn
          ? bt(t, void 0, e)
          : Bn.get(t, e & _t.Optional ? null : void 0, e);
      }
      function Gn(t, e = _t.Default) {
        return (yt || Wn)(rt(t), e);
      }
      function Zn(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = rt(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t,
              n = _t.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e],
                i = s.__NG_DI_FLAG__;
              "number" == typeof i
                ? -1 === i
                  ? (t = s.token)
                  : (n |= i)
                : (t = s);
            }
            e.push(Gn(t, n));
          } else e.push(Gn(r));
        }
        return e;
      }
      function Qn(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t;
      }
      const Jn = Qn(
          An("Inject", (t) => ({ token: t })),
          -1
        ),
        Kn = Qn(An("Optional"), 8),
        Yn = Qn(An("SkipSelf"), 4);
      class Xn {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function tr(t) {
        return t instanceof Xn ? t.changingThisBreaksApplicationSecurity : t;
      }
      const er = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        nr = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var rr = (function (t) {
        return (
          (t[(t.NONE = 0)] = "NONE"),
          (t[(t.HTML = 1)] = "HTML"),
          (t[(t.STYLE = 2)] = "STYLE"),
          (t[(t.SCRIPT = 3)] = "SCRIPT"),
          (t[(t.URL = 4)] = "URL"),
          (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          t
        );
      })({});
      function sr(t) {
        const e = (function () {
          const t = xe();
          return t && t[12];
        })();
        return e
          ? e.sanitize(rr.URL, t) || ""
          : (function (t, e) {
              const n = (function (t) {
                return (t instanceof Xn && t.getTypeName()) || null;
              })(t);
              if (null != n && n !== e) {
                if ("ResourceURL" === n && "URL" === e) return !0;
                throw new Error(
                  `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === e;
            })(t, "URL")
          ? tr(t)
          : ((n = it(t)),
            (n = String(n)).match(er) || n.match(nr) ? n : "unsafe:" + n);
        var n;
      }
      function ir(t) {
        return t.ngDebugContext;
      }
      function or(t) {
        return t.ngOriginalError;
      }
      function ar(t, ...e) {
        t.error(...e);
      }
      class lr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || ar;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (ir(t) ? ir(t) : this._findContext(or(t))) : null;
        }
        _findOriginalError(t) {
          let e = or(t);
          for (; e && or(e); ) e = or(e);
          return e;
        }
      }
      function cr(t, e) {
        t.__ngContext__ = e;
      }
      const ur = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(kt))();
      function hr(t) {
        return t instanceof Function ? t() : t;
      }
      var dr = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      function fr(t, e) {
        return (void 0)(t, e);
      }
      function pr(t) {
        const e = t[3];
        return Yt(e) ? e[3] : e;
      }
      function gr(t) {
        return _r(t[13]);
      }
      function mr(t) {
        return _r(t[4]);
      }
      function _r(t) {
        for (; null !== t && !Yt(t); ) t = t[4];
        return t;
      }
      function yr(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          Yt(r) ? (i = r) : Kt(r) && ((o = !0), (r = r[0]));
          const a = he(r);
          0 === t && null !== n
            ? null == s
              ? Er(e, n, a)
              : Sr(e, n, a, s || null, !0)
            : 1 === t && null !== n
            ? Sr(e, n, a, s || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = Tr(t, e);
                r &&
                  (function (t, e, n, r) {
                    ce(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== he(n) && yr(e, t, r, i, s);
                for (let o = Jt; o < n.length; o++) {
                  const s = n[o];
                  Mr(s[1], s, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function vr(t, e, n) {
        return ce(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function br(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3];
        1024 & e[2] && ((e[2] &= -1025), be(s, -1)), n.splice(r, 1);
      }
      function wr(t, e) {
        if (t.length <= Jt) return;
        const n = Jt + e,
          r = t[n];
        if (r) {
          const i = r[17];
          null !== i && i !== t && br(i, r), e > 0 && (t[n - 1][4] = r[4]);
          const o = Un(t, Jt + e);
          Mr(r[1], (s = r), s[11], 2, null, null), (s[0] = null), (s[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        var s;
        return r;
      }
      function Cr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          ce(n) && n.destroyNode && Mr(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return xr(t[1], t);
              for (; e; ) {
                let n = null;
                if (Kt(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Kt(e) && xr(e[1], e), (e = e[3]);
                  null === e && (e = t), Kt(e) && xr(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function xr(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof en)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let s = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const t = n[i + 1],
                      o = "function" == typeof t ? t(e) : he(e[t]),
                      a = r[(s = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? o.removeEventListener(n[i], a, l)
                      : l >= 0
                      ? r[(s = l)]()
                      : r[(s = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const t = r[(s = n[i + 1])];
                    n[i].call(t);
                  }
              if (null !== r) {
                for (let t = s + 1; t < r.length; t++) (0, r[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && ce(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && Yt(e[3])) {
            n !== e[3] && br(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function Sr(t, e, n, r, s) {
        ce(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
      }
      function Er(t, e, n) {
        ce(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function Or(t, e, n, r, s) {
        null !== r ? Sr(t, e, n, r, s) : Er(t, e, n);
      }
      function Tr(t, e) {
        return ce(t) ? t.parentNode(e) : e.parentNode;
      }
      function kr(t, e, n, r) {
        const s = (function (t, e, n) {
            return (function (t, e, n) {
              let r = e;
              for (; null !== r && 40 & r.type; ) r = (e = r).parent;
              if (null === r) return n[0];
              if (2 & r.flags) {
                const e = t.data[r.directiveStart].encapsulation;
                if (e === xt.None || e === xt.Emulated) return null;
              }
              return fe(r, n);
            })(t, e.parent, n);
          })(t, r, e),
          i = e[11],
          o = (function (t, e, n) {
            return (function (t, e, n) {
              return 40 & t.type ? fe(t, n) : null;
            })(t, 0, n);
          })(r.parent || e[6], 0, e);
        if (null != s)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) Or(i, s, n[a], o, !1);
          else Or(i, s, n, o, !1);
      }
      function Pr(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return fe(e, t);
          if (4 & n) return Rr(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return Pr(t, n);
            {
              const n = t[e.index];
              return Yt(n) ? Rr(-1, n) : he(n);
            }
          }
          if (32 & n) return fr(e, t)() || he(t[e.index]);
          {
            const n = Ar(t, e);
            return null !== n
              ? Array.isArray(n)
                ? n[0]
                : Pr(pr(t[16]), n)
              : Pr(t, e.next);
          }
        }
        return null;
      }
      function Ar(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function Rr(t, e) {
        const n = Jt + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r) return Pr(t, r);
        }
        return e[7];
      }
      function Ir(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && cr(he(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Ir(t, e, n.child, r, s, i, !1), yr(e, t, s, a, i);
            else if (32 & l) {
              const o = fr(n, r);
              let l;
              for (; (l = o()); ) yr(e, t, s, l, i);
              yr(e, t, s, a, i);
            } else 16 & l ? jr(t, e, r, n, s, i) : yr(e, t, s, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function Mr(t, e, n, r, s, i) {
        Ir(n, r, t.firstChild, e, s, i, !1);
      }
      function jr(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) yr(e, t, s, a[l], i);
        else Ir(t, e, a, o[3], s, i, !0);
      }
      function Dr(t, e, n) {
        ce(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Ur(t, e, n) {
        ce(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function Nr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Hr = "ng-template";
      function Fr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== Nr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Lr(t) {
        return 4 === t.type && t.value !== Hr;
      }
      function Vr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Hr);
      }
      function $r(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (rn(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !Vr(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (zr(r)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!Fr(t.attrs, c, n)) {
                    if (zr(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = Br(8 & r ? "class" : l, s, Lr(t), n);
                if (-1 === u) {
                  if (zr(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > i ? "" : s[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== Nr(e, c, 0)) || (2 & r && c !== t)) {
                    if (zr(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !zr(r) && !zr(l)) return !1;
            if (o && zr(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return zr(r) || o;
      }
      function zr(t) {
        return 0 == (1 & t);
      }
      function Br(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function qr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if ($r(t, e[r], n)) return !0;
        return !1;
      }
      function Wr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Gr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n];
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
          else
            "" === s || zr(o) || ((e += Wr(i, s)), (s = "")),
              (r = o),
              (i = i || !zr(r));
          n++;
        }
        return "" !== s && (e += Wr(i, s)), e;
      }
      const Zr = {};
      function Qr(t) {
        Jr(Se(), xe(), qe() + t, Pe());
      }
      function Jr(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && Qe(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && Je(e, r, 0, n);
          }
        We(n);
      }
      function Kr(t, e) {
        return (t << 17) | (e << 2);
      }
      function Yr(t) {
        return (t >> 17) & 32767;
      }
      function Xr(t) {
        return 2 | t;
      }
      function ts(t) {
        return (131068 & t) >> 2;
      }
      function es(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function ns(t) {
        return 1 | t;
      }
      function rs(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const n = t.data[i];
              Ue(s), n.contentQueries(2, e[i], i);
            }
          }
      }
      function ss(t, e, n, r, s, i, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = s),
          (u[2] = 140 | r),
          ve(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function is(t, e, n, r, s) {
        let i = t.data[e];
        if (null === i)
          (i = (function (t, e, n, r, s) {
            const i = Oe(),
              o = ke(),
              a = (t.data[e] = (function (t, e, n, r, s, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, e, r, s));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            );
          })(t, e, n, r, s)),
            we.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = s);
          const t = (function () {
            const t = we.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return Te(i, !0), i;
      }
      function os(t, e, n, r) {
        if (0 === n) return -1;
        const s = e.length;
        for (let i = 0; i < n; i++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return s;
      }
      function as(t, e, n) {
        Fe(e);
        try {
          const r = t.viewQuery;
          null !== r && js(1, r, n);
          const s = t.template;
          null !== s && us(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && rs(t, e),
            t.staticViewQueries && js(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) As(t, e[n]);
            })(e, i);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), Be();
        }
      }
      function ls(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        Fe(e);
        const i = Pe();
        try {
          ve(e),
            (we.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && us(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && Qe(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && Je(e, n, 0, null), Ke(e, 0);
            }
          if (
            ((function (t) {
              for (let e = gr(t); null !== e; e = mr(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && be(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = gr(t); null !== e; e = mr(e))
                for (let t = Jt; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  _e(n) && ls(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && rs(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && Qe(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && Je(e, n, 1), Ke(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t];
                  if (r < 0) We(~r);
                  else {
                    const s = r,
                      i = n[++t],
                      o = n[++t];
                    je(i, s), o(2, e[s]);
                  }
                }
              } finally {
                We(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ks(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && js(2, l, r), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && Qe(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && Je(e, n, 2), Ke(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), be(e[3], -1));
        } finally {
          Be();
        }
      }
      function cs(t, e, n, r) {
        const s = e[10],
          i = !Pe(),
          o = 4 == (4 & e[2]);
        try {
          i && !o && s.begin && s.begin(), o && as(t, e, r), ls(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function us(t, e, n, r, s) {
        const i = qe();
        try {
          We(-1), 2 & r && e.length > Qt && Jr(t, e, Qt, Pe()), n(r, s);
        } finally {
          We(i);
        }
      }
      function hs(t, e, n) {
        Ce() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || pn(n, e), cr(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = ne(r);
              i && Ss(e, n, r);
              const l = En(e, t, a, n);
              cr(l, e),
                null !== o && Es(0, a - s, l, r, 0, o),
                i && (ge(n.index, e)[8] = l);
            }
          })(t, e, n, fe(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = n.index,
                o = we.lFrame.currentDirectiveIndex;
              try {
                We(i);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  De(n),
                    (null === r.hostBindings &&
                      0 === r.hostVars &&
                      null === r.hostAttrs) ||
                      vs(r, s);
                }
              } finally {
                We(-1), De(o);
              }
            })(t, e, n));
      }
      function ds(t, e, n = fe) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function fs(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = ps(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function ps(t, e, n, r, s, i, o, a, l, c) {
        const u = Qt + r,
          h = u + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : Zr);
            return n;
          })(u, h),
          f = "function" == typeof c ? c() : c;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function gs(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function ms(t, e, n, r, s, i, o, a) {
        const l = fe(e, n);
        let c,
          u = e.inputs;
        var h;
        !a && null != u && (c = u[r])
          ? (Us(t, n, c, r, s),
            te(e) &&
              (function (t, e) {
                const n = ge(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 & e.type &&
            ((r =
              "class" === (h = r)
                ? "className"
                : "for" === h
                ? "htmlFor"
                : "formaction" === h
                ? "formAction"
                : "innerHtml" === h
                ? "innerHTML"
                : "readonly" === h
                ? "readOnly"
                : "tabindex" === h
                ? "tabIndex"
                : h),
            (s = null != o ? o(s, e.value || "", r) : s),
            ce(i)
              ? i.setProperty(l, r, s)
              : sn(r) || (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
      }
      function _s(t, e, n, r) {
        let s = !1;
        if (Ce()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  qr(n, o.selectors, !1) &&
                    (s || (s = []),
                    yn(pn(n, e), t, o.type),
                    ne(o) ? (bs(t, n), s.unshift(o)) : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            (s = !0), Cs(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            let r = !1,
              a = !1,
              l = os(t, e, i.length, null);
            for (let s = 0; s < i.length; s++) {
              const c = i[s];
              (n.mergedAttrs = on(n.mergedAttrs, c.hostAttrs)),
                xs(t, n, e, l, c),
                ws(l, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const u = c.type.prototype;
              !r &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (r = !0)),
                a ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (a = !0)),
                l++;
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  c = null === s || Lr(e) ? null : Os(n, s);
                i.push(c), (o = gs(n, l, o)), (a = gs(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new st(
                      "301",
                      `Export of name '${e[t + 1]}' not found!`
                    );
                  r.push(e[t], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = on(n.mergedAttrs, n.attrs)), s;
      }
      function ys(t, e, n, r, s, i) {
        const o = i.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const i = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(r, s, o);
        }
      }
      function vs(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function bs(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function ws(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          ne(e) && (n[""] = t);
        }
      }
      function Cs(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function xs(t, e, n, r, s) {
        t.data[r] = s;
        const i = s.factory || (s.factory = re(s.type)),
          o = new en(i, ne(s), null);
        (t.blueprint[r] = o),
          (n[r] = o),
          ys(t, e, 0, r, os(t, n, s.hostVars, Zr), s);
      }
      function Ss(t, e, n) {
        const r = fe(e, t),
          s = fs(n),
          i = t[10],
          o = Rs(
            t,
            ss(
              t,
              s,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function Es(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
          }
        }
      }
      function Os(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Ts(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function ks(t, e) {
        const n = ge(e, t);
        if (_e(n)) {
          const t = n[1];
          80 & n[2] ? ls(t, n, t.template, n[8]) : n[5] > 0 && Ps(n);
        }
      }
      function Ps(t) {
        for (let n = gr(t); null !== n; n = mr(n))
          for (let t = Jt; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              ls(t, e, t.template, e[8]);
            } else e[5] > 0 && Ps(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = ge(e[n], t);
            _e(r) && r[5] > 0 && Ps(r);
          }
      }
      function As(t, e) {
        const n = ge(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          as(r, n, n[8]);
      }
      function Rs(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Is(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          ls(t, e, t.template, n);
        } catch (s) {
          throw (
            ((function (t, e) {
              const n = t[9],
                r = n ? n.get(lr, null) : null;
              r && r.handleError(e);
            })(e, s),
            s)
          );
        } finally {
          r.end && r.end();
        }
      }
      function Ms(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = me(n),
              s = r[1];
            cs(s, r, s.template, n);
          }
        })(t[8]);
      }
      function js(t, e, n) {
        Ue(0), e(t, n);
      }
      const Ds = (() => Promise.resolve(null))();
      function Us(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function Ns(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            "number" == typeof t
              ? (i = t)
              : 1 == i
              ? (s = tt(s, t))
              : 2 == i && (r = tt(r, t + ": " + e[++o] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      const Hs = new Rn("INJECTOR", -1);
      class Fs {
        get(t, e = Ln) {
          if (e === Ln) {
            const e = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      const Ls = new Rn("Set Injector scope."),
        Vs = {},
        $s = {},
        zs = [];
      let Bs;
      function qs() {
        return void 0 === Bs && (Bs = new Fs()), Bs;
      }
      function Ws(t, e = null, n = null, r) {
        return new Gs(t, n, e || qs(), r);
      }
      class Gs {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && jn(e, (n) => this.processProvider(n, t, e)),
            jn([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Hs, Qs(void 0, this));
          const i = this.records.get(Ls);
          (this.scope = null != i ? i.value : null),
            (this.source = r || ("object" == typeof t ? null : X(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Ln, n = _t.Default) {
          this.assertNotDestroyed();
          const r = qn(this);
          try {
            if (!(n & _t.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Rn)) &&
                  ut(t);
                (e = n && this.injectableDefInScope(n) ? Qs(Zs(t), Vs) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & _t.Self ? qs() : this.parent).get(
              t,
              (e = n & _t.Optional && e === Ln ? null : e)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(X(t)), r)
              )
                throw i;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e[$n] && s.unshift(e[$n]),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = X(e);
                    if (Array.isArray(e)) s = e.map(X).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : X(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      Vn,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            qn(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(X(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = rt(t))) return !1;
          let r = dt(t);
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== s && (r = dt(s)), null == r)) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
              jn(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                jn(r, (t) => this.processProvider(t, n, r || zs));
              }
          }
          this.injectorDefTypes.add(i);
          const a = re(i) || (() => new i());
          this.records.set(i, Qs(a, Vs));
          const l = r.providers;
          if (null != l && !o) {
            const e = t;
            jn(l, (t) => this.processProvider(t, e, l));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = Ks((t = rt(t))) ? t : rt(t && t.provide);
          const s = (function (t, e, n) {
            return Js(t)
              ? Qs(void 0, t.useValue)
              : Qs(
                  (function (t, e, n) {
                    let r;
                    if (Ks(t)) {
                      const e = rt(t);
                      return re(e) || Zs(e);
                    }
                    if (Js(t)) r = () => rt(t.useValue);
                    else if ((s = t) && s.useFactory)
                      r = () => t.useFactory(...Zn(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => Gn(rt(t.useExisting));
                    else {
                      const e = rt(t && (t.useClass || t.provide));
                      if (
                        !(function (t) {
                          return !!t.deps;
                        })(t)
                      )
                        return re(e) || Zs(e);
                      r = () => new e(...Zn(t.deps));
                    }
                    var s;
                    return r;
                  })(t),
                  Vs
                );
          })(t);
          if (Ks(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e ||
              ((e = Qs(void 0, Vs, !0)),
              (e.factory = () => Zn(e.multi)),
              this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Vs && ((e.value = $s), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Zs(t) {
        const e = ut(t),
          n = null !== e ? e.factory : re(t);
        if (null !== n) return n;
        if (t instanceof Rn)
          throw new Error(`Token ${X(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push("?");
                return n;
              })(e);
              throw new Error(
                `Can't resolve all parameters for ${X(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ft] || t[gt]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Qs(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Js(t) {
        return null !== t && "object" == typeof t && zn in t;
      }
      function Ks(t) {
        return "function" == typeof t;
      }
      const Ys = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = Ws(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let Xs = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? Ys(t, e, "")
              : Ys(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Ln),
          (t.NULL = new Fs()),
          (t.ɵprov = lt({
            token: t,
            providedIn: "any",
            factory: () => Gn(Hs),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function ti(t, e) {
        Ze(me(t)[1], Ee());
      }
      let ei = null;
      function ni() {
        if (!ei) {
          const t = kt.Symbol;
          if (t && t.iterator) ei = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (ei = n);
            }
          }
        }
        return ei;
      }
      class ri {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new ri(t);
        }
        static unwrap(t) {
          return ri.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof ri;
        }
      }
      function si(t) {
        return (
          !!ii(t) && (Array.isArray(t) || (!(t instanceof Map) && ni() in t))
        );
      }
      function ii(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function oi(t, e, n) {
        return (t[e] = n);
      }
      function ai(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function li(t, e, n, r) {
        return ai(t, Ie(), n) ? e + it(n) + r : Zr;
      }
      function ci(t, e, n, r, s, i, o, a) {
        const l = xe(),
          c = Se(),
          u = t + Qt,
          h = c.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const c = e.consts,
                  u = is(e, t, 4, o || null, ye(c, a));
                _s(e, n, u, ye(c, l)), Ze(e, u);
                const h = (u.tViews = ps(
                  2,
                  u,
                  r,
                  s,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  c
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, e, n, r, s, i, o)
            : c.data[u];
        Te(h, !1);
        const d = l[11].createComment("");
        kr(c, l, d, h),
          cr(d, l),
          Rs(l, (l[u] = Ts(d, l, d, h))),
          ee(h) && hs(c, l, h),
          null != o && ds(l, h, a);
      }
      function ui(t, e = _t.Default) {
        const n = xe();
        return null === n ? Gn(t, e) : wn(Ee(), n, rt(t), e);
      }
      function hi(t, e, n) {
        const r = xe();
        return ai(r, Ie(), e) && ms(Se(), Ge(), r, t, e, r[11], n, !1), hi;
      }
      function di(t, e, n, r, s) {
        const i = s ? "class" : "style";
        Us(t, n, e.inputs[i], i, r);
      }
      function fi(t, e, n, r) {
        const s = xe(),
          i = Se(),
          o = Qt + t,
          a = s[11],
          l = (s[o] = vr(a, e, we.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  l = is(e, t, 2, s, ye(a, i));
                return (
                  _s(e, n, l, ye(a, o)),
                  null !== l.attrs && Ns(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ns(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(o, i, s, 0, e, n, r)
            : i.data[o];
        Te(c, !0);
        const u = c.mergedAttrs;
        null !== u && nn(a, l, u);
        const h = c.classes;
        null !== h && Ur(a, l, h);
        const d = c.styles;
        null !== d && Dr(a, l, d),
          64 != (64 & c.flags) && kr(i, s, l, c),
          0 === we.lFrame.elementDepthCount && cr(l, s),
          we.lFrame.elementDepthCount++,
          ee(c) &&
            (hs(i, s, c),
            (function (t, e, n) {
              if (Xt(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(i, c, s)),
          null !== r && ds(s, c);
      }
      function pi() {
        let t = Ee();
        ke() ? (we.lFrame.isParent = !1) : ((t = t.parent), Te(t, !1));
        const e = t;
        we.lFrame.elementDepthCount--;
        const n = Se();
        n.firstCreatePass && (Ze(n, t), Xt(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            di(n, e, xe(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            di(n, e, xe(), e.stylesWithoutHost, !1);
      }
      function gi(t, e, n, r) {
        fi(t, e, n, r), pi();
      }
      function mi(t) {
        return !!t && "function" == typeof t.then;
      }
      function _i(t = 1) {
        return (function (t) {
          return (we.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, we.lFrame.contextLView))[8];
        })(t);
      }
      function yi(t, e, n) {
        return vi(t, "", e, "", n), yi;
      }
      function vi(t, e, n, r, s) {
        const i = xe(),
          o = li(i, e, n, r);
        return o !== Zr && ms(Se(), Ge(), i, t, o, i[11], s, !1), vi;
      }
      const bi = [];
      function wi(t, e, n, r, s) {
        const i = t[n + 1],
          o = null === e;
        let a = r ? Yr(i) : ts(i),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          Ci(t[a], e) && ((l = !0), (t[a + 1] = r ? ns(n) : Xr(n))),
            (a = r ? Yr(n) : ts(n));
        }
        l && (t[n + 1] = r ? Xr(i) : ns(i));
      }
      function Ci(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && Fn(t, e) >= 0)
        );
      }
      const xi = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Si(t) {
        return t.substring(xi.key, xi.keyEnd);
      }
      function Ei(t, e) {
        const n = xi.textEnd;
        return n === e
          ? -1
          : ((e = xi.keyEnd = (function (t, e, n) {
              for (; e < n && t.charCodeAt(e) > 32; ) e++;
              return e;
            })(t, (xi.key = e), n)),
            Oi(t, e, n));
      }
      function Oi(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function Ti(t, e, n) {
        return (
          (function (t, e, n, r) {
            const s = xe(),
              i = Se(),
              o = Me(2);
            i.firstUpdatePass && Ai(i, t, o, false),
              e !== Zr &&
                ai(s, o, e) &&
                Mi(
                  i,
                  i.data[qe()],
                  s,
                  s[11],
                  t,
                  (s[o + 1] = (function (t, e) {
                    return (
                      null == t ||
                        ("string" == typeof e
                          ? (t += e)
                          : "object" == typeof t && (t = X(tr(t)))),
                      t
                    );
                  })(e, n)),
                  false,
                  o
                );
          })(t, e, n),
          Ti
        );
      }
      function ki(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (xi.key = 0),
                  (xi.keyEnd = 0),
                  (xi.value = 0),
                  (xi.valueEnd = 0),
                  (xi.textEnd = t.length);
              })(t),
              Ei(t, Oi(t, 0, xi.textEnd))
            );
          })(e);
          n >= 0;
          n = Ei(e, n)
        )
          Nn(t, Si(e), !0);
      }
      function Pi(t, e) {
        return e >= t.expandoStartIndex;
      }
      function Ai(t, e, n, r) {
        const s = t.data;
        if (null === s[n + 1]) {
          const i = s[qe()],
            o = Pi(t, n);
          Ui(i, r) && null === e && !o && (e = !1),
            (e = (function (t, e, n, r) {
              const s = (function (t) {
                const e = we.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let i = r ? e.residualClasses : e.residualStyles;
              if (null === s)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = Ii((n = Ri(null, t, e, n, r)), e.attrs, r)),
                  (i = null));
              else {
                const o = e.directiveStylingLast;
                if (-1 === o || t[o] !== s)
                  if (((n = Ri(s, t, e, n, r)), null === i)) {
                    let n = (function (t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings;
                      if (0 !== ts(r)) return t[Yr(r)];
                    })(t, e, r);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = Ri(null, t, e, n[1], r)),
                      (n = Ii(n, e.attrs, r)),
                      (function (t, e, n, r) {
                        t[Yr(n ? e.classBindings : e.styleBindings)] = r;
                      })(t, e, r, n));
                  } else
                    i = (function (t, e, n) {
                      let r;
                      const s = e.directiveEnd;
                      for (let i = 1 + e.directiveStylingLast; i < s; i++)
                        r = Ii(r, t[i].hostAttrs, n);
                      return Ii(r, e.attrs, n);
                    })(t, e, r);
              }
              return (
                void 0 !== i &&
                  (r ? (e.residualClasses = i) : (e.residualStyles = i)),
                n
              );
            })(s, i, e, r)),
            (function (t, e, n, r, s, i) {
              let o = i ? e.classBindings : e.styleBindings,
                a = Yr(o),
                l = ts(o);
              t[r] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const t = n;
                (c = t[1]), (null === c || Fn(t, c) > 0) && (u = !0);
              } else c = n;
              if (s)
                if (0 !== l) {
                  const e = Yr(t[a + 1]);
                  (t[r + 1] = Kr(e, a)),
                    0 !== e && (t[e + 1] = es(t[e + 1], r)),
                    (t[a + 1] = (131071 & t[a + 1]) | (r << 17));
                } else
                  (t[r + 1] = Kr(a, 0)),
                    0 !== a && (t[a + 1] = es(t[a + 1], r)),
                    (a = r);
              else
                (t[r + 1] = Kr(l, 0)),
                  0 === a ? (a = r) : (t[l + 1] = es(t[l + 1], r)),
                  (l = r);
              u && (t[r + 1] = Xr(t[r + 1])),
                wi(t, c, r, !0),
                wi(t, c, r, !1),
                (function (t, e, n, r, s) {
                  const i = s ? t.residualClasses : t.residualStyles;
                  null != i &&
                    "string" == typeof e &&
                    Fn(i, e) >= 0 &&
                    (n[r + 1] = ns(n[r + 1]));
                })(e, c, t, r, i),
                (o = Kr(a, l)),
                i ? (e.classBindings = o) : (e.styleBindings = o);
            })(s, i, e, n, o, r);
        }
      }
      function Ri(t, e, n, r, s) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (r = Ii(r, i.hostAttrs, s)), i !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function Ii(t, e, n) {
        const r = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            "number" == typeof o
              ? (s = o)
              : s === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                Nn(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function Mi(t, e, n, r, s, i, o, a) {
        if (!(3 & e.type)) return;
        const l = t.data,
          c = l[a + 1];
        Di(1 == (1 & c) ? ji(l, e, n, s, ts(c), o) : void 0) ||
          (Di(i) || (2 == (2 & c) && (i = ji(l, null, n, s, a, o))),
          (function (t, e, n, r, s) {
            const i = ce(t);
            if (e)
              s
                ? i
                  ? t.addClass(n, r)
                  : n.classList.add(r)
                : i
                ? t.removeClass(n, r)
                : n.classList.remove(r);
            else {
              let e = -1 === r.indexOf("-") ? void 0 : dr.DashCase;
              if (null == s)
                i ? t.removeStyle(n, r, e) : n.style.removeProperty(r);
              else {
                const o = "string" == typeof s && s.endsWith("!important");
                o && ((s = s.slice(0, -10)), (e |= dr.Important)),
                  i
                    ? t.setStyle(n, r, s, e)
                    : n.style.setProperty(r, s, o ? "important" : "");
              }
            }
          })(r, o, de(qe(), n), s, i));
      }
      function ji(t, e, n, r, s, i) {
        const o = null === e;
        let a;
        for (; s > 0; ) {
          const e = t[s],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            c = null === l;
          let u = n[s + 1];
          u === Zr && (u = c ? bi : void 0);
          let h = c ? Hn(u, r) : l === r ? u : void 0;
          if ((i && !Di(h) && (h = Hn(e, r)), Di(h) && ((a = h), o))) return a;
          const d = t[s + 1];
          s = o ? Yr(d) : ts(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = Hn(t, r));
        }
        return a;
      }
      function Di(t) {
        return void 0 !== t;
      }
      function Ui(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function Ni(t, e = "") {
        const n = xe(),
          r = Se(),
          s = t + Qt,
          i = r.firstCreatePass ? is(r, s, 1, e, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return ce(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        kr(r, n, o, i), Te(i, !1);
      }
      function Hi(t) {
        return Fi("", t, ""), Hi;
      }
      function Fi(t, e, n) {
        const r = xe(),
          s = li(r, t, e, n);
        return (
          s !== Zr &&
            (function (t, e, n) {
              const r = de(e, t);
              !(function (t, e, n) {
                ce(t) ? t.setValue(e, n) : (e.textContent = n);
              })(t[11], r, n);
            })(r, qe(), s),
          Fi
        );
      }
      const Li = void 0;
      var Vi = [
        "en",
        [["a", "p"], ["AM", "PM"], Li],
        [["AM", "PM"], Li, Li],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Li,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Li,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Li, "{1} 'at' {0}", Li],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let $i = {};
      function zi(t) {
        return (
          t in $i ||
            ($i[t] =
              kt.ng &&
              kt.ng.common &&
              kt.ng.common.locales &&
              kt.ng.common.locales[t]),
          $i[t]
        );
      }
      var Bi = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      const qi = "en-US";
      let Wi = qi;
      function Gi(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                `ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Wi = t.toLowerCase().replace(/_/g, "-"));
      }
      class Zi {}
      class Qi {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${X(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Ji = (() => {
        class t {}
        return (t.NULL = new Qi()), t;
      })();
      function Ki(...t) {}
      function Yi(t, e) {
        return new to(fe(t, e));
      }
      const Xi = function () {
        return Yi(Ee(), xe());
      };
      let to = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = Xi), t;
      })();
      class eo {}
      let no = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ro()), t;
      })();
      const ro = function () {
        const t = xe(),
          e = ge(Ee().index, t);
        return (function (t) {
          return t[11];
        })(Kt(e) ? e : t);
      };
      let so = (() => {
        class t {}
        return (
          (t.ɵprov = lt({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class io {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const oo = new io("11.2.5");
      class ao {
        constructor() {}
        supports(t) {
          return si(t);
        }
        create(t) {
          return new co(t);
        }
      }
      const lo = (t, e) => e;
      class co {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || lo);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < po(n, r, s)) ? e : n,
              o = po(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !si(t)))
            throw new Error(
              `Error trying to diff '${X(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[ni()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : (t = this._addAfter(new uo(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new fo()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new fo()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class uo {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class ho {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class fo {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new ho()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function po(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class go {
        constructor() {}
        supports(t) {
          return t instanceof Map || ii(t);
        }
        create() {
          return new mo();
        }
      }
      class mo {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || ii(t)))
              throw new Error(
                `Error trying to diff '${X(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new _o(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class _o {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function yo() {
        return new vo([new ao()]);
      }
      let vo = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || yo()),
              deps: [[t, new Yn(), new Kn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (null != e) return e;
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${
                ((n = t), n.name || typeof n)
              }'`
            );
            var n;
          }
        }
        return (t.ɵprov = lt({ token: t, providedIn: "root", factory: yo })), t;
      })();
      function bo() {
        return new wo([new go()]);
      }
      let wo = (() => {
        class t {
          constructor(t) {
            this.factories = t;
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice();
              e = e.concat(t);
            }
            return new t(e);
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: (n) => t.create(e, n || bo()),
              deps: [[t, new Yn(), new Kn()]],
            };
          }
          find(t) {
            const e = this.factories.find((e) => e.supports(t));
            if (e) return e;
            throw new Error(`Cannot find a differ supporting object '${t}'`);
          }
        }
        return (t.ɵprov = lt({ token: t, providedIn: "root", factory: bo })), t;
      })();
      function Co(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && r.push(he(i)), Yt(i)))
            for (let t = Jt; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild;
              null !== n && Co(e[1], e, n, r);
            }
          const o = n.type;
          if (8 & o) Co(t, e, n.child, r);
          else if (32 & o) {
            const t = fr(n, e);
            let s;
            for (; (s = t()); ) r.push(s);
          } else if (16 & o) {
            const t = Ar(e, n);
            if (Array.isArray(t)) r.push(...t);
            else {
              const n = pr(e[16]);
              Co(n[1], n, t, r, !0);
            }
          }
          n = s ? n.projectionNext : n.next;
        }
        return r;
      }
      class xo {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return Co(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Yt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (wr(t, n), Un(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          Cr(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function (t, e, n, r) {
            const s = (i = e)[7] || (i[7] = []);
            var i;
            s.push(r);
          })(0, this._lView, 0, t);
        }
        markForCheck() {
          !(function (t) {
            for (; t; ) {
              t[2] |= 64;
              const e = pr(t);
              if (0 != (512 & t[2]) && !e) return t;
              t = e;
            }
          })(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Is(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Ae(!0);
            try {
              Is(t, e, n);
            } finally {
              Ae(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            Mr(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class So extends xo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Ms(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Ae(!0);
            try {
              Ms(t);
            } finally {
              Ae(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const Eo = function (t = !1) {
        return (function (t, e, n) {
          if (!n && te(t)) {
            const n = ge(t.index, e);
            return new xo(n, n);
          }
          return 47 & t.type ? new xo(e[16], e) : null;
        })(Ee(), xe(), t);
      };
      let Oo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Eo), (t.__ChangeDetectorRef__ = !0), t;
      })();
      const To = [new go()],
        ko = new vo([new ao()]),
        Po = new wo(To),
        Ao = function () {
          return (
            (t = Ee()), (e = xe()), 4 & t.type ? new Mo(e, t, Yi(t, e)) : null
          );
          var t, e;
        };
      let Ro = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Ao), t;
      })();
      const Io = Ro,
        Mo = class extends Io {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = ss(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null
              );
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const r = this._declarationLView[19];
            return (
              null !== r && (n[19] = r.createEmbeddedView(e)),
              as(e, n, t),
              new xo(n)
            );
          }
        };
      class jo {}
      class Do {}
      const Uo = function () {
        return (function (t, e) {
          let n;
          const r = e[t.index];
          if (Yt(r)) n = r;
          else {
            let s;
            if (8 & t.type) s = he(r);
            else {
              const n = e[11];
              s = n.createComment("");
              const r = fe(t, e);
              Sr(
                n,
                Tr(n, r),
                s,
                (function (t, e) {
                  return ce(t) ? t.nextSibling(e) : e.nextSibling;
                })(n, r),
                !1
              );
            }
            (e[t.index] = n = Ts(r, e, s, t)), Rs(e, n);
          }
          return new Fo(n, t, e);
        })(Ee(), xe());
      };
      let No = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Uo), t;
      })();
      const Ho = No,
        Fo = class extends Ho {
          constructor(t, e, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = n);
          }
          get element() {
            return Yi(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new kn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = _n(this._hostTNode, this._hostLView);
            if (ln(t)) {
              const e = un(t, this._hostLView),
                n = cn(t);
              return new kn(e[1].data[n + 8], e);
            }
            return new kn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Lo(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - Jt;
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r;
          }
          createComponent(t, e, n, r, s) {
            const i = n || this.parentInjector;
            if (!s && null == t.ngModule && i) {
              const t = i.get(jo, null);
              t && (s = t);
            }
            const o = t.create(i, r, void 0, s);
            return this.insert(o.hostView, e), o;
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1];
            if (Yt(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  r = new Fo(e, e[6], e[3]);
                r.detach(r.indexOf(t));
              }
            }
            const s = this._adjustIndex(e),
              i = this._lContainer;
            !(function (t, e, n, r) {
              const s = Jt + r,
                i = n.length;
              r > 0 && (n[s - 1][4] = e),
                r < i - Jt
                  ? ((e[4] = n[s]), Dn(n, Jt + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(r, n, i, s);
            const o = Rr(s, i),
              a = n[11],
              l = Tr(a, i[7]);
            return (
              null !== l &&
                (function (t, e, n, r, s, i) {
                  (r[0] = s), (r[6] = e), Mr(t, r, n, 1, s, i);
                })(r, i[6], a, n, l, o),
              t.attachToViewContainerRef(),
              Dn(Vo(i), s, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Lo(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = wr(this._lContainer, e);
            n && (Un(Vo(this._lContainer), e), Cr(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = wr(this._lContainer, e);
            return n && null != Un(Vo(this._lContainer), e) ? new xo(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function Lo(t) {
        return t[8];
      }
      function Vo(t) {
        return t[8] || (t[8] = []);
      }
      const $o = {};
      class zo extends Ji {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = Gt(t);
          return new Wo(e, this.ngModule);
        }
      }
      function Bo(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const qo = new Rn("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => ur,
      });
      class Wo extends Zi {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Gr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Bo(this.componentDef.inputs);
        }
        get outputs() {
          return Bo(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, $o, s);
                      return i !== $o || r === $o ? i : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            i = s.get(eo, ue),
            o = s.get(so, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (ce(t)) return t.selectRootElement(e, n === xt.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : vr(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: ur,
              clean: Ds,
              playerHandler: null,
              flags: 0,
            },
            d = ps(0, null, null, 1, 0, null, null, null, null, null),
            f = ss(null, d, h, u, null, null, i, a, o, s);
          let p, g;
          Fe(f);
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[20] = t;
              const a = is(o, 20, 2, "#host", null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Ns(a, l, !0),
                null !== t &&
                  (nn(s, t, l),
                  null !== a.classes && Ur(s, t, a.classes),
                  null !== a.styles && Dr(s, t, a.styles)));
              const c = r.createRenderer(t, e),
                u = ss(
                  n,
                  fs(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  c,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (yn(pn(a, n), o, e.type), bs(o, a), Cs(a, n.length, 1)),
                Rs(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, f, i, a);
            if (c)
              if (n) nn(a, c, ["ng-version", oo.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i);
                    else {
                      if (!zr(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && nn(a, c, t), e && e.length > 0 && Ur(a, c, e.join(" "));
              }
            if (((g = pe(d, Qt)), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (p = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = Ee();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    xs(t, r, e, os(t, e, 1, null), n));
                  const s = En(e, t, r.directiveStart, r);
                  cr(s, e);
                  const i = fe(r, e);
                  return i && cr(i, e), s;
                })(i, n, e);
              if (
                (r.components.push(o),
                (t[8] = o),
                s && s.forEach((t) => t(o, e)),
                e.contentQueries)
              ) {
                const t = Ee();
                e.contentQueries(1, o, t.directiveStart);
              }
              const a = Ee();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (We(a.index),
                  ys(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  vs(e, o)),
                o
              );
            })(t, this.componentDef, f, h, [ti])),
              as(d, f, null);
          } finally {
            Be();
          }
          return new Go(this.componentType, p, Yi(g, f), f, g);
        }
      }
      class Go extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new So(r)),
            (this.componentType = t);
        }
        get injector() {
          return new kn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const Zo = new Map();
      class Qo extends jo {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new zo(this));
          const n = Zt(t),
            r = t[Dt] || null;
          r && Gi(r),
            (this._bootstrapComponents = hr(n.bootstrap)),
            (this._r3Injector = Ws(
              t,
              e,
              [
                { provide: jo, useValue: this },
                { provide: Ji, useValue: this.componentFactoryResolver },
              ],
              X(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = Xs.THROW_IF_NOT_FOUND, n = _t.Default) {
          return t === Xs || t === jo || t === Hs
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Jo extends Do {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Zt(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const r = Zt(n, !0),
                    s = r.id;
                  null !== s &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${X(
                            e
                          )} vs ${X(e.name)}`
                        );
                    })(s, Zo.get(s), n),
                    Zo.set(s, n));
                  const i = hr(r.imports);
                  for (const o of i) e.has(o) || (e.add(o), t(o));
                })(t);
              })(t);
        }
        create(t) {
          return new Qo(this.moduleType, t);
        }
      }
      function Ko(t, e) {
        const n = t[e];
        return n === Zr ? void 0 : n;
      }
      const Yo = class extends x {
          constructor(t = !1) {
            super(), (this.__isAsync = t);
          }
          emit(t) {
            super.next(t);
          }
          subscribe(t, e, n) {
            let r,
              s = (t) => null,
              i = () => null;
            t && "object" == typeof t
              ? ((r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.next(e));
                    }
                  : (e) => {
                      t.next(e);
                    }),
                t.error &&
                  (s = this.__isAsync
                    ? (e) => {
                        setTimeout(() => t.error(e));
                      }
                    : (e) => {
                        t.error(e);
                      }),
                t.complete &&
                  (i = this.__isAsync
                    ? () => {
                        setTimeout(() => t.complete());
                      }
                    : () => {
                        t.complete();
                      }))
              : ((r = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t(e));
                    }
                  : (e) => {
                      t(e);
                    }),
                e &&
                  (s = this.__isAsync
                    ? (t) => {
                        setTimeout(() => e(t));
                      }
                    : (t) => {
                        e(t);
                      }),
                n &&
                  (i = this.__isAsync
                    ? () => {
                        setTimeout(() => n());
                      }
                    : () => {
                        n();
                      }));
            const o = super.subscribe(r, s, i);
            return t instanceof h && t.add(o), o;
          }
        },
        Xo = new Rn("Application Initializer");
      let ta = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = Ki),
              (this.reject = Ki),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                mi(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Xo, 8));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ea = new Rn("AppId"),
        na = {
          provide: ea,
          useFactory: function () {
            return `${ra()}${ra()}${ra()}`;
          },
          deps: [],
        };
      function ra() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const sa = new Rn("Platform Initializer"),
        ia = new Rn("Platform ID"),
        oa = new Rn("appBootstrapListener");
      let aa = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const la = new Rn("LocaleId"),
        ca = new Rn("DefaultCurrencyCode");
      class ua {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const ha = function (t) {
          return new Jo(t);
        },
        da = ha,
        fa = function (t) {
          return Promise.resolve(ha(t));
        },
        pa = function (t) {
          const e = ha(t),
            n = hr(Zt(t).declarations).reduce((t, e) => {
              const n = Gt(e);
              return n && t.push(new Wo(n)), t;
            }, []);
          return new ua(e, n);
        },
        ga = pa,
        ma = function (t) {
          return Promise.resolve(pa(t));
        };
      let _a = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = da),
              (this.compileModuleAsync = fa),
              (this.compileModuleAndAllComponentsSync = ga),
              (this.compileModuleAndAllComponentsAsync = ma);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ya = (() => Promise.resolve(0))();
      function va(t) {
        "undefined" == typeof Zone
          ? ya.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class ba {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Yo(!1)),
            (this.onMicrotaskEmpty = new Yo(!1)),
            (this.onStable = new Yo(!1)),
            (this.onError = new Yo(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !n && e),
            (r.shouldCoalesceRunChangeDetection = n),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function () {
              let t = kt.requestAnimationFrame,
                e = kt.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  -1 === t.lastRequestAnimationFrameId &&
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                      kt,
                      () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                xa(t),
                                Ca(t);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      }
                    )),
                    xa(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return Sa(t), n.invokeTask(s, i, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Ea(t);
                  }
                },
                onInvoke: (n, r, s, i, o, a, l) => {
                  try {
                    return Sa(t), n.invoke(s, i, o, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Ea(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          xa(t),
                          Ca(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ba.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (ba.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, wa, Ki, Ki);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const wa = {};
      function Ca(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function xa(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Sa(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ea(t) {
        t._nesting--, Ca(t);
      }
      class Oa {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Yo()),
            (this.onMicrotaskEmpty = new Yo()),
            (this.onStable = new Yo()),
            (this.onError = new Yo());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Ta = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ba.assertNotInAngularZone(),
                        va(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                va(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(ba));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        ka = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Ra.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Ra.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Pa {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Aa,
        Ra = new Pa(),
        Ia = !0,
        Ma = !1;
      const ja = new Rn("AllowMultipleToken");
      class Da {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Ua(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new Rn(r);
        return (e = []) => {
          let i = Na();
          if (!i || i.injector.get(ja, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: Ls, useValue: "platform" }
                );
              !(function (t) {
                if (Aa && !Aa.destroyed && !Aa.injector.get(ja, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Aa = t.get(Ha);
                const e = t.get(sa, null);
                e && e.forEach((t) => t());
              })(Xs.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = Na();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function Na() {
        return Aa && !Aa.destroyed ? Aa : null;
      }
      let Ha = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Oa()
                      : ("zone.js" === t ? void 0 : t) ||
                        new ba({
                          enableLongStackTrace: ((Ma = !0), Ia),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              r = [{ provide: ba, useValue: n }];
            return n.run(() => {
              const e = Xs.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                i = s.injector.get(lr, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  });
                  s.onDestroy(() => {
                    Va(this._modules, s), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return mi(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(i, n, () => {
                  const t = s.injector.get(ta);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Gi(s.injector.get(la, qi) || qi),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Fa({}, e);
            return (function (t, e, n) {
              const r = new Jo(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(La);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${X(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Xs));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Fa(t, e) {
        return Array.isArray(e)
          ? e.reduce(Fa, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let La = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this._zone = t),
              (this._injector = e),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = r),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe(
                {
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }
              ));
            const i = new y((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              o = new y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    ba.assertNotInAngularZone(),
                      va(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  ba.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                E(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof y
                  ? t[0]
                  : z(e)(B(t, n))
              );
            })(
              i,
              o.pipe((t) => {
                return q()(
                  ((e = K),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, Q);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Zi
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(jo),
              s = n.create(Xs.NULL, [], e || n.selector, r),
              i = s.location.nativeElement,
              o = s.injector.get(Ta, null),
              a = o && s.injector.get(ka);
            return (
              o && a && a.registerApplication(i, o),
              s.onDestroy(() => {
                this.detachView(s.hostView),
                  Va(this.components, s),
                  a && a.unregisterApplication(i);
              }),
              this._loadComponent(s),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Va(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(oa, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(ba), Gn(Xs), Gn(lr), Gn(Ji), Gn(ta));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Va(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class $a {}
      class za {}
      const Ba = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let qa = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Ba);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => Wa(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => Wa(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(_a), Gn(za, 8));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Wa(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Ga = Ua(null, "core", [
          { provide: ia, useValue: "unknown" },
          { provide: Ha, deps: [Xs] },
          { provide: ka, deps: [] },
          { provide: aa, deps: [] },
        ]),
        Za = [
          { provide: La, useClass: La, deps: [ba, Xs, lr, Ji, ta] },
          {
            provide: qo,
            deps: [ba],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: ta, useClass: ta, deps: [[new Kn(), Xo]] },
          { provide: _a, useClass: _a, deps: [] },
          na,
          {
            provide: vo,
            useFactory: function () {
              return ko;
            },
            deps: [],
          },
          {
            provide: wo,
            useFactory: function () {
              return Po;
            },
            deps: [],
          },
          {
            provide: la,
            useFactory: function (t) {
              return (
                Gi(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    qi)
                ),
                t
              );
            },
            deps: [[new Jn(la), new Kn(), new Yn()]],
          },
          { provide: ca, useValue: "USD" },
        ];
      let Qa = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(La));
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ct({ providers: Za })),
            t
          );
        })(),
        Ja = null;
      function Ka() {
        return Ja;
      }
      const Ya = new Rn("DocumentToken");
      let Xa = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ factory: tl, token: t, providedIn: "platform" })),
          t
        );
      })();
      function tl() {
        return Gn(nl);
      }
      const el = new Rn("Location Initialized");
      let nl = (() => {
        class t extends Xa {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = Ka().getLocation()),
              (this._history = Ka().getHistory());
          }
          getBaseHrefFromDOM() {
            return Ka().getBaseHref(this._doc);
          }
          onPopState(t) {
            Ka()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            Ka()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            rl() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            rl()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Ya));
          }),
          (t.ɵprov = lt({ factory: sl, token: t, providedIn: "platform" })),
          t
        );
      })();
      function rl() {
        return !!window.history.pushState;
      }
      function sl() {
        return new nl(Gn(Ya));
      }
      function il(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function ol(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function al(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let ll = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ factory: cl, token: t, providedIn: "root" })),
          t
        );
      })();
      function cl(t) {
        const e = Gn(Ya).location;
        return new hl(Gn(Xa), (e && e.origin) || "");
      }
      const ul = new Rn("appBaseHref");
      let hl = (() => {
          class t extends ll {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return il(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  al(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + al(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + al(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(Xa), Gn(ul, 8));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        dl = (() => {
          class t extends ll {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = il(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + al(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + al(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(Xa), Gn(ul, 8));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        fl = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Yo()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = ol(gl(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + al(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, gl(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + al(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + al(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(ll), Gn(Xa));
            }),
            (t.normalizeQueryParams = al),
            (t.joinWithSlash = il),
            (t.stripTrailingSlash = ol),
            (t.ɵprov = lt({ factory: pl, token: t, providedIn: "root" })),
            t
          );
        })();
      function pl() {
        return new fl(Gn(ll), Gn(Xa));
      }
      function gl(t) {
        return t.replace(/\/index.html$/, "");
      }
      var ml = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class _l {}
      let yl = (() => {
          class t extends _l {
            constructor(t) {
              super(), (this.locale = t);
            }
            getPluralCategory(t, e) {
              switch (
                (function (t) {
                  return (function (t) {
                    const e = (function (t) {
                      return t.toLowerCase().replace(/_/g, "-");
                    })(t);
                    let n = zi(e);
                    if (n) return n;
                    const r = e.split("-")[0];
                    if (((n = zi(r)), n)) return n;
                    if ("en" === r) return Vi;
                    throw new Error(
                      `Missing locale data for the locale "${t}".`
                    );
                  })(t)[Bi.PluralCase];
                })(e || this.locale)(t)
              ) {
                case ml.Zero:
                  return "zero";
                case ml.One:
                  return "one";
                case ml.Two:
                  return "two";
                case ml.Few:
                  return "few";
                case ml.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(la));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        vl = (() => {
          class t {
            constructor(t, e, n, r) {
              (this._iterableDiffers = t),
                (this._keyValueDiffers = e),
                (this._ngEl = n),
                (this._renderer = r),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._initialClasses = []),
                (this._rawClass = null);
            }
            set klass(t) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof t ? t.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }
            set ngClass(t) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
                this._rawClass &&
                  (si(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const t = this._iterableDiffer.diff(this._rawClass);
                t && this._applyIterableChanges(t);
              } else if (this._keyValueDiffer) {
                const t = this._keyValueDiffer.diff(this._rawClass);
                t && this._applyKeyValueChanges(t);
              }
            }
            _applyKeyValueChanges(t) {
              t.forEachAddedItem((t) =>
                this._toggleClass(t.key, t.currentValue)
              ),
                t.forEachChangedItem((t) =>
                  this._toggleClass(t.key, t.currentValue)
                ),
                t.forEachRemovedItem((t) => {
                  t.previousValue && this._toggleClass(t.key, !1);
                });
            }
            _applyIterableChanges(t) {
              t.forEachAddedItem((t) => {
                if ("string" != typeof t.item)
                  throw new Error(
                    `NgClass can only toggle CSS classes expressed as strings, got ${X(
                      t.item
                    )}`
                  );
                this._toggleClass(t.item, !0);
              }),
                t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
            }
            _applyClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach((t) => this._toggleClass(t, !0))
                  : Object.keys(t).forEach((e) =>
                      this._toggleClass(e, !!t[e])
                    ));
            }
            _removeClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach((t) => this._toggleClass(t, !1))
                  : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
            }
            _toggleClass(t, e) {
              (t = t.trim()) &&
                t.split(/\s+/g).forEach((t) => {
                  e
                    ? this._renderer.addClass(this._ngEl.nativeElement, t)
                    : this._renderer.removeClass(this._ngEl.nativeElement, t);
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(ui(vo), ui(wo), ui(to), ui(no));
            }),
            (t.ɵdir = qt({
              type: t,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            })),
            t
          );
        })();
      class bl {
        constructor(t, e, n, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let wl = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new bl(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new Cl(t, n);
                e.push(s);
              } else if (null == r)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, r);
                const i = new Cl(t, s);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = r),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ui(No), ui(Ro), ui(vo));
          }),
          (t.ɵdir = qt({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class Cl {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let xl = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new Sl()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            El("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            El("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(ui(No), ui(Ro));
          }),
          (t.ɵdir = qt({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class Sl {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function El(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${X(e)}'.`
          );
      }
      let Ol = (() => {
          class t {
            transform(e) {
              if (null == e) return null;
              if ("string" != typeof e)
                throw (function (t, e) {
                  return Error(
                    `InvalidPipeArgument: '${e}' for pipe '${X(t)}'`
                  );
                })(t, e);
              return e.toUpperCase();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵpipe = Wt({ name: "uppercase", type: t, pure: !0 })),
            t
          );
        })(),
        Tl = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ct({ providers: [{ provide: _l, useClass: yl }] })),
            t
          );
        })(),
        kl = (() => {
          class t {}
          return (
            (t.ɵprov = lt({
              token: t,
              providedIn: "root",
              factory: () => new Pl(Gn(Ya), window),
            })),
            t
          );
        })();
      class Pl {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          var e;
          if (!this.supportsScrolling()) return;
          const n =
            null !== (e = this.document.getElementById(t)) && void 0 !== e
              ? e
              : this.document.getElementsByName(t)[0];
          void 0 !== n && (this.scrollToElement(n), this.attemptFocus(n));
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Al(this.window.history) ||
              Al(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function Al(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class Rl extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Rl()), Ja || (Ja = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            Ml || ((Ml = document.querySelector("base")), Ml)
              ? Ml.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Il || (Il = document.createElement("a")),
              Il.setAttribute("href", n),
              "/" === Il.pathname.charAt(0) ? Il.pathname : "/" + Il.pathname);
          var n;
        }
        resetBaseElement() {
          Ml = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (r.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Il,
        Ml = null;
      const jl = new Rn("TRANSITION_ID"),
        Dl = [
          {
            provide: Xo,
            useFactory: function (t, e, n) {
              return () => {
                n.get(ta).donePromise.then(() => {
                  const n = Ka();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [jl, Ya, Xs],
            multi: !0,
          },
        ];
      class Ul {
        static init() {
          var t;
          (t = new Ul()), (Ra = t);
        }
        addToWindow(t) {
          (kt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (kt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (kt.getAllAngularRootElements = () => t.getAllRootElements()),
            kt.frameworkStabilizers || (kt.frameworkStabilizers = []),
            kt.frameworkStabilizers.push((t) => {
              const e = kt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? Ka().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Nl = new Rn("EventManagerPlugins");
      let Hl = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Nl), Gn(ba));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Fl {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = Ka().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let Ll = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Vl = (() => {
          class t extends Ll {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => Ka().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(Ya));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const $l = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        zl = /%COMP%/g;
      function Bl(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? Bl(t, s, n) : ((s = s.replace(zl, t)), n.push(s));
        }
        return n;
      }
      function ql(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Wl = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Gl(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case xt.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new Zl(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case xt.ShadowDom:
                return new Ql(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Bl(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Hl), Gn(Vl), Gn(ea));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Gl {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS($l[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = $l[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = $l[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & (dr.DashCase | dr.Important)
            ? t.style.setProperty(e, n, r & dr.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & dr.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, ql(n))
            : this.eventManager.addEventListener(t, e, ql(n));
        }
      }
      class Zl extends Gl {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = Bl(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              zl,
              r + "-" + n.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(zl, r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Ql extends Gl {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Bl(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style");
            (t.textContent = s[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Jl = (() => {
        class t extends Fl {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Ya));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Kl = ["alt", "control", "meta", "shift"],
        Yl = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Xl = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        tc = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let ec = (() => {
        class t extends Fl {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              i = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Ka().onAndCancel(e, s.domEventName, i));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = t._normalizeKey(n.pop());
            let i = "";
            if (
              (Kl.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (i += t + "."));
              }),
              (i += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const o = {};
            return (o.domEventName = r), (o.fullKey = i), o;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Xl.hasOwnProperty(e) && (e = Xl[e]));
                }
                return Yl[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              Kl.forEach((r) => {
                r != n && (0, tc[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Ya));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const nc = Ua(Ga, "browser", [
          { provide: ia, useValue: "browser" },
          {
            provide: sa,
            useValue: function () {
              Rl.makeCurrent(), Ul.init();
            },
            multi: !0,
          },
          {
            provide: Ya,
            useFactory: function () {
              return (
                (function (t) {
                  le = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        rc = [
          [],
          { provide: Ls, useValue: "root" },
          {
            provide: lr,
            useFactory: function () {
              return new lr();
            },
            deps: [],
          },
          { provide: Nl, useClass: Jl, multi: !0, deps: [Ya, ba, ia] },
          { provide: Nl, useClass: ec, multi: !0, deps: [Ya] },
          [],
          { provide: Wl, useClass: Wl, deps: [Hl, Vl, ea] },
          { provide: eo, useExisting: Wl },
          { provide: Ll, useExisting: Vl },
          { provide: Vl, useClass: Vl, deps: [Ya] },
          { provide: Ta, useClass: Ta, deps: [ba] },
          { provide: Hl, useClass: Hl, deps: [Nl, ba] },
          [],
        ];
      let sc = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ea, useValue: e.appId },
                { provide: jl, useExisting: ea },
                Dl,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(t, 12));
          }),
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = ct({ providers: rc, imports: [Tl, Qa] })),
          t
        );
      })();
      function ic(...t) {
        let e = t[t.length - 1];
        return E(e) ? (t.pop(), D(t, e)) : B(t);
      }
      "undefined" != typeof window && window;
      class oc extends x {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new b();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      class ac extends p {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      class lc extends p {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function cc(t, e, n, r, s = new lc(t, n, r)) {
        if (!s.closed) return e instanceof y ? e.subscribe(s) : j(e)(s);
      }
      const uc = {};
      class hc {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new dc(t, this.resultSelector));
        }
      }
      class dc extends ac {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(uc), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) this.add(cc(this, t[n], void 0, n));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n) {
          const r = this.values,
            s = this.toRespond
              ? r[n] === uc
                ? --this.toRespond
                : this.toRespond
              : 0;
          (r[n] = e),
            0 === s &&
              (this.resultSelector
                ? this._tryResultSelector(r)
                : this.destination.next(r.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const fc = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function pc(...t) {
        return z(1)(ic(...t));
      }
      const gc = new y((t) => t.complete());
      function mc(t) {
        return t
          ? (function (t) {
              return new y((e) => t.schedule(() => e.complete()));
            })(t)
          : gc;
      }
      function _c(t) {
        return new y((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? U(n) : mc()).subscribe(e);
        });
      }
      function yc(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(yc((n, r) => U(t(n, r)).pipe(O((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new vc(t));
      }
      class vc {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new bc(t, this.project));
        }
      }
      class bc extends H {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new N(this),
            r = this.destination;
          r.add(n),
            (this.innerSubscription = F(t, n)),
            this.innerSubscription !== n && r.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      const wc = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Cc(t) {
        return (e) => (0 === t ? mc() : e.lift(new xc(t)));
      }
      class xc {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new wc();
        }
        call(t, e) {
          return e.subscribe(new Sc(t, this.total));
        }
      }
      class Sc extends p {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Ec(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Oc(t, e, n));
          }
        );
      }
      class Oc {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Tc(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Tc extends p {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function kc(t, e) {
        return function (n) {
          return n.lift(new Pc(t, e));
        };
      }
      class Pc {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Ac(t, this.predicate, this.thisArg));
        }
      }
      class Ac extends p {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      function Rc(t) {
        return function (e) {
          const n = new Ic(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class Ic {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new Mc(t, this.selector, this.caught));
        }
      }
      class Mc extends H {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new N(this);
            this.add(r);
            const s = F(n, r);
            s !== r && this.add(s);
          }
        }
      }
      function jc(t, e) {
        return L(t, e, 1);
      }
      function Dc(t) {
        return function (e) {
          return 0 === t ? mc() : e.lift(new Uc(t));
        };
      }
      class Uc {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new wc();
        }
        call(t, e) {
          return e.subscribe(new Nc(t, this.total));
        }
      }
      class Nc extends p {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function Hc(t = Vc) {
        return (e) => e.lift(new Fc(t));
      }
      class Fc {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new Lc(t, this.errorFactory));
        }
      }
      class Lc extends p {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function Vc() {
        return new fc();
      }
      function $c(t = null) {
        return (e) => e.lift(new zc(t));
      }
      class zc {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new Bc(t, this.defaultValue));
        }
      }
      class Bc extends p {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function qc(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? kc((e, n) => t(e, n, r)) : _,
            Cc(1),
            n ? $c(e) : Hc(() => new fc())
          );
      }
      function Wc() {}
      function Gc(t, e, n) {
        return function (r) {
          return r.lift(new Zc(t, e, n));
        };
      }
      class Zc {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new Qc(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class Qc extends p {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = Wc),
            (this._tapError = Wc),
            (this._tapComplete = Wc),
            (this._tapError = n || Wc),
            (this._tapComplete = s || Wc),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || Wc),
                (this._tapError = e.error || Wc),
                (this._tapComplete = e.complete || Wc));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class Jc {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new Kc(t, this.callback));
        }
      }
      class Kc extends p {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class Yc {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Xc extends Yc {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class tu extends Yc {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class eu extends Yc {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class nu extends Yc {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class ru extends Yc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class su extends Yc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class iu extends Yc {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class ou extends Yc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class au extends Yc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class lu {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class cu {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class uu {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class hu {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class du {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class fu {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class pu {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const gu = "primary";
      class mu {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function _u(t) {
        return new mu(t);
      }
      function yu(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function vu(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      function bu(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !wu(t[s], e[s]))) return !1;
        return !0;
      }
      function wu(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((t, e) => r[e] === t);
        }
        return t === e;
      }
      function Cu(t) {
        return Array.prototype.concat.apply([], t);
      }
      function xu(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Su(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Eu(t) {
        return (e = t) && "function" == typeof e.subscribe
          ? t
          : mi(t)
          ? U(Promise.resolve(t))
          : ic(t);
        var e;
      }
      function Ou(t, e, n) {
        return n
          ? (function (t, e) {
              return bu(t, e);
            })(t.queryParams, e.queryParams) && Tu(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => wu(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) && ku(t.root, e.root);
      }
      function Tu(t, e) {
        if (!Mu(t.segments, e.segments)) return !1;
        if (t.numberOfChildren !== e.numberOfChildren) return !1;
        for (const n in e.children) {
          if (!t.children[n]) return !1;
          if (!Tu(t.children[n], e.children[n])) return !1;
        }
        return !0;
      }
      function ku(t, e) {
        return Pu(t, e, e.segments);
      }
      function Pu(t, e, n) {
        if (t.segments.length > n.length)
          return !!Mu(t.segments.slice(0, n.length), n) && !e.hasChildren();
        if (t.segments.length === n.length) {
          if (!Mu(t.segments, n)) return !1;
          for (const n in e.children) {
            if (!t.children[n]) return !1;
            if (!ku(t.children[n], e.children[n])) return !1;
          }
          return !0;
        }
        {
          const r = n.slice(0, t.segments.length),
            s = n.slice(t.segments.length);
          return (
            !!Mu(t.segments, r) &&
            !!t.children.primary &&
            Pu(t.children.primary, e, s)
          );
        }
      }
      class Au {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = _u(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Uu.serialize(this);
        }
      }
      class Ru {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Su(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Nu(this);
        }
      }
      class Iu {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = _u(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Bu(this);
        }
      }
      function Mu(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      class ju {}
      class Du {
        parse(t) {
          const e = new Qu(t);
          return new Au(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          var e;
          return `/${Hu(t.root, !0)}${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Lu(e)}=${Lu(t)}`).join("&")
                : `${Lu(e)}=${Lu(n)}`;
            });
            return e.length ? `?${e.join("&")}` : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ""
          }`;
        }
      }
      const Uu = new Du();
      function Nu(t) {
        return t.segments.map((t) => Bu(t)).join("/");
      }
      function Hu(t, e) {
        if (!t.hasChildren()) return Nu(t);
        if (e) {
          const e = t.children.primary ? Hu(t.children.primary, !1) : "",
            n = [];
          return (
            Su(t.children, (t, e) => {
              e !== gu && n.push(`${e}:${Hu(t, !1)}`);
            }),
            n.length > 0 ? `${e}(${n.join("//")})` : e
          );
        }
        {
          const e = (function (t, e) {
            let n = [];
            return (
              Su(t.children, (t, r) => {
                r === gu && (n = n.concat(e(t, r)));
              }),
              Su(t.children, (t, r) => {
                r !== gu && (n = n.concat(e(t, r)));
              }),
              n
            );
          })(t, (e, n) =>
            n === gu ? [Hu(t.children.primary, !1)] : [`${n}:${Hu(e, !1)}`]
          );
          return 1 === Object.keys(t.children).length &&
            null != t.children.primary
            ? `${Nu(t)}/${e[0]}`
            : `${Nu(t)}/(${e.join("//")})`;
        }
      }
      function Fu(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Lu(t) {
        return Fu(t).replace(/%3B/gi, ";");
      }
      function Vu(t) {
        return Fu(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function $u(t) {
        return decodeURIComponent(t);
      }
      function zu(t) {
        return $u(t.replace(/\+/g, "%20"));
      }
      function Bu(t) {
        return `${Vu(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${Vu(t)}=${Vu(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const qu = /^[^\/()?;=#]+/;
      function Wu(t) {
        const e = t.match(qu);
        return e ? e[0] : "";
      }
      const Gu = /^[^=?&#]+/,
        Zu = /^[^?&#]+/;
      class Qu {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Ru([], {})
              : new Ru([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new Ru(t, e)),
            n
          );
        }
        parseSegment() {
          const t = Wu(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Iu($u(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = Wu(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = Wu(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[$u(e)] = $u(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(Gu);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(Zu);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = zu(e),
            s = zu(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = Wu(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = gu);
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i.primary : new Ru([], i)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class Ju {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = Ku(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = Ku(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Yu(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return Yu(t, this._root).map((t) => t.value);
        }
      }
      function Ku(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = Ku(t, n);
          if (e) return e;
        }
        return null;
      }
      function Yu(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = Yu(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Xu {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function th(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class eh extends Ju {
        constructor(t, e) {
          super(t), (this.snapshot = e), ah(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function nh(t, e) {
        const n = (function (t, e) {
            const n = new ih([], {}, {}, "", {}, gu, e, null, t.root, -1, {});
            return new oh("", new Xu(n, []));
          })(t, e),
          r = new oc([new Iu("", {})]),
          s = new oc({}),
          i = new oc({}),
          o = new oc({}),
          a = new oc(""),
          l = new rh(r, s, o, a, i, gu, e, n.root);
        return (l.snapshot = n.root), new eh(new Xu(l, []), n);
      }
      class rh {
        constructor(t, e, n, r, s, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(O((t) => _u(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(O((t) => _u(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function sh(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class ih {
        constructor(t, e, n, r, s, i, o, a, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = _u(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = _u(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class oh extends Ju {
        constructor(t, e) {
          super(e), (this.url = t), ah(this, e);
        }
        toString() {
          return lh(this._root);
        }
      }
      function ah(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => ah(t, e));
      }
      function lh(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(lh).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function ch(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            bu(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            bu(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!bu(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            bu(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function uh(t, e) {
        var n, r;
        return (
          bu(t.params, e.params) &&
          Mu((n = t.url), (r = e.url)) &&
          n.every((t, e) => bu(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || uh(t.parent, e.parent))
        );
      }
      function hh(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const s = (function (t, e, n) {
            return e.children.map((e) => {
              for (const r of n.children)
                if (t.shouldReuseRoute(e.value, r.value.snapshot))
                  return hh(t, e, r);
              return hh(t, e);
            });
          })(t, e, n);
          return new Xu(r, s);
        }
        {
          const n = t.retrieve(e.value);
          if (n) {
            const t = n.route;
            return dh(e, t), t;
          }
          {
            const n = new rh(
                new oc((r = e.value).url),
                new oc(r.params),
                new oc(r.queryParams),
                new oc(r.fragment),
                new oc(r.data),
                r.outlet,
                r.component,
                r
              ),
              s = e.children.map((e) => hh(t, e));
            return new Xu(n, s);
          }
        }
        var r;
      }
      function dh(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot created from a different route"
          );
        if (t.children.length !== e.children.length)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot with a different number of children"
          );
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n)
          dh(t.children[n], e.children[n]);
      }
      function fh(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function ph(t) {
        return "object" == typeof t && null != t && t.outlets;
      }
      function gh(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Su(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new Au(n.root === t ? e : mh(n.root, t, e), i, s)
        );
      }
      function mh(t, e, n) {
        const r = {};
        return (
          Su(t.children, (t, s) => {
            r[s] = t === e ? n : mh(t, e, n);
          }),
          new Ru(t.segments, r)
        );
      }
      class _h {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && fh(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(ph);
          if (r && r !== xu(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class yh {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function vh(t, e, n) {
        if (
          (t || (t = new Ru([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return bh(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = n[r];
              if (ph(o)) break;
              const a = `${o}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === a) break;
              if (a && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Sh(a, l, e)) return i;
                r += 2;
              } else {
                if (!Sh(a, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new Ru(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new Ru(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            bh(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Ru(t.segments, {})
          : r.match && !t.hasChildren()
          ? wh(t, e, n)
          : r.match
          ? bh(t, 0, s)
          : wh(t, e, n);
      }
      function bh(t, e, n) {
        if (0 === n.length) return new Ru(t.segments, {});
        {
          const r = (function (t) {
              return ph(t[0]) ? t[0].outlets : { [gu]: t };
            })(n),
            s = {};
          return (
            Su(r, (n, r) => {
              "string" == typeof n && (n = [n]),
                null !== n && (s[r] = vh(t.children[r], e, n));
            }),
            Su(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new Ru(t.segments, s)
          );
        }
      }
      function wh(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if (ph(i)) {
            const t = Ch(i.outlets);
            return new Ru(r, t);
          }
          if (0 === s && fh(n[0])) {
            r.push(new Iu(t.segments[e].path, xh(n[0]))), s++;
            continue;
          }
          const o = ph(i) ? i.outlets.primary : `${i}`,
            a = s < n.length - 1 ? n[s + 1] : null;
          o && a && fh(a)
            ? (r.push(new Iu(o, xh(a))), (s += 2))
            : (r.push(new Iu(o, {})), s++);
        }
        return new Ru(r, {});
      }
      function Ch(t) {
        const e = {};
        return (
          Su(t, (t, n) => {
            "string" == typeof t && (t = [t]),
              null !== t && (e[n] = wh(new Ru([], {}), 0, t));
          }),
          e
        );
      }
      function xh(t) {
        const e = {};
        return Su(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function Sh(t, e, n) {
        return t == n.path && bu(e, n.parameters);
      }
      class Eh {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            ch(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = th(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Su(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet),
            r = n && t.value.component ? n.children : e,
            s = th(t);
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], r);
          n &&
            n.outlet &&
            (n.outlet.deactivate(), n.children.onOutletDeactivated());
        }
        activateChildRoutes(t, e, n) {
          const r = th(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new fu(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new hu(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((ch(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Oh(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Oh(t) {
        ch(t.value), t.children.forEach(Oh);
      }
      class Th {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function kh(t) {
        return "function" == typeof t;
      }
      function Ph(t) {
        return t instanceof Au;
      }
      const Ah = Symbol("INITIAL_VALUE");
      function Rh() {
        return yc((t) =>
          (function (...t) {
            let e, n;
            return (
              E(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              B(t, n).lift(new hc(e))
            );
          })(
            t.map((t) =>
              t.pipe(
                Cc(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return E(e) ? (t.pop(), (n) => pc(t, n, e)) : (e) => pc(t, e);
                })(Ah)
              )
            )
          ).pipe(
            Ec((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== Ah) return t;
                if ((r === Ah && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Ph(r)) return r;
                }
                return t;
              }, t);
            }, Ah),
            kc((t) => t !== Ah),
            O((t) => (Ph(t) ? t : !0 === t)),
            Cc(1)
          )
        );
      }
      let Ih = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = Ft({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && gi(0, "router-outlet");
            },
            directives: function () {
              return [xd];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function Mh(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          jh(r, Dh(e, r));
        }
      }
      function jh(t, e) {
        t.children && Mh(t.children, e);
      }
      function Dh(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function Uh(t) {
        const e = t.children && t.children.map(Uh),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== gu &&
            (n.component = Ih),
          n
        );
      }
      function Nh(t) {
        return t.outlet || gu;
      }
      function Hh(t, e) {
        const n = t.filter((t) => Nh(t) === e);
        return n.push(...t.filter((t) => Nh(t) !== e)), n;
      }
      const Fh = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function Lh(t, e, n) {
        var r;
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, Fh)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const s = (e.matcher || vu)(n, t, e);
        if (!s) return Object.assign({}, Fh);
        const i = {};
        Su(s.posParams, (t, e) => {
          i[e] = t.path;
        });
        const o =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, i),
                s.consumed[s.consumed.length - 1].parameters
              )
            : i;
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: o,
          positionalParamSegments:
            null !== (r = s.posParams) && void 0 !== r ? r : {},
        };
      }
      function Vh(t, e, n, r, s = "corrected") {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => $h(t, e, n) && Nh(n) !== gu);
          })(t, n, r)
        ) {
          const s = new Ru(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && Nh(i) !== gu) {
                  const n = new Ru([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Nh(i)] = n);
                }
              return s;
            })(t, e, r, new Ru(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => $h(t, e, n));
          })(t, n, r)
        ) {
          const i = new Ru(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if ($h(t, n, a) && !s[Nh(a)]) {
                  const n = new Ru([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[Nh(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new Ru(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function $h(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function zh(t, e, n, r) {
        return (
          !!(Nh(t) === r || (r !== gu && $h(e, n, t))) &&
          ("**" === t.path || Lh(e, t, n).matched)
        );
      }
      function Bh(t, e, n) {
        return 0 === e.length && !t.children[n];
      }
      class qh {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Wh {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Gh(t) {
        return new y((e) => e.error(new qh(t)));
      }
      function Zh(t) {
        return new y((e) => e.error(new Wh(t)));
      }
      function Qh(t) {
        return new y((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class Jh {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(jo));
        }
        apply() {
          const t = Vh(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new Ru(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, e, gu)
            .pipe(
              O((t) =>
                this.createUrlTree(
                  Kh(t),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Rc((t) => {
                if (t instanceof Wh)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof qh) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, gu)
            .pipe(
              O((e) => this.createUrlTree(Kh(e), t.queryParams, t.fragment))
            )
            .pipe(
              Rc((t) => {
                if (t instanceof qh) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new Ru([], { [gu]: t }) : t;
          return new Au(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(O((t) => new Ru([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          const r = [];
          for (const s of Object.keys(n.children))
            "primary" === s ? r.unshift(s) : r.push(s);
          return U(r).pipe(
            jc((r) => {
              const s = n.children[r],
                i = Hh(e, r);
              return this.expandSegmentGroup(t, i, s, r).pipe(
                O((t) => ({ segment: t, outlet: r }))
              );
            }),
            Ec((t, e) => ((t[e.outlet] = e.segment), t), {}),
            (function (t, e) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  t ? kc((e, n) => t(e, n, r)) : _,
                  Dc(1),
                  n ? $c(e) : Hc(() => new fc())
                );
            })()
          );
        }
        expandSegment(t, e, n, r, s, i) {
          return U(n).pipe(
            jc((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                Rc((t) => {
                  if (t instanceof qh) return ic(null);
                  throw t;
                })
              )
            ),
            qc((t) => !!t),
            Rc((t, n) => {
              if (t instanceof fc || "EmptyError" === t.name) {
                if (Bh(e, r, s)) return ic(new Ru([], {}));
                throw new qh(e);
              }
              throw t;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return zh(r, e, s, i)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, s, i)
              : o && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
              : Gh(e)
            : Gh(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Zh(s)
            : this.lineralizeSegments(n, s).pipe(
                L((n) => {
                  const s = new Ru(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c,
          } = Lh(e, r, s);
          if (!o) return Gh(e);
          const u = this.applyRedirectCommands(a, r.redirectTo, c);
          return r.redirectTo.startsWith("/")
            ? Zh(u)
            : this.lineralizeSegments(r, u).pipe(
                L((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r, s) {
          if ("**" === n.path)
            return n.loadChildren
              ? (n._loadedConfig
                  ? ic(n._loadedConfig)
                  : this.configLoader.load(t.injector, n)
                ).pipe(O((t) => ((n._loadedConfig = t), new Ru(r, {}))))
              : ic(new Ru(r, {}));
          const { matched: i, consumedSegments: o, lastChild: a } = Lh(e, n, r);
          if (!i) return Gh(e);
          const l = r.slice(a);
          return this.getChildConfig(t, n, r).pipe(
            L((t) => {
              const r = t.module,
                i = t.routes,
                { segmentGroup: a, slicedSegments: c } = Vh(e, o, l, i),
                u = new Ru(a.segments, a.children);
              if (0 === c.length && u.hasChildren())
                return this.expandChildren(r, i, u).pipe(
                  O((t) => new Ru(o, t))
                );
              if (0 === i.length && 0 === c.length) return ic(new Ru(o, {}));
              const h = Nh(n) === s;
              return this.expandSegment(r, u, i, c, h ? gu : s, !0).pipe(
                O((t) => new Ru(o.concat(t.segments), t.children))
              );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? ic(new Th(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? ic(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  L((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(O((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new y((e) =>
                            e.error(
                              yu(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : ic(new Th([], t));
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad;
          return r && 0 !== r.length
            ? ic(
                r.map((r) => {
                  const s = t.get(r);
                  let i;
                  if (
                    (function (t) {
                      return t && kh(t.canLoad);
                    })(s)
                  )
                    i = s.canLoad(e, n);
                  else {
                    if (!kh(s)) throw new Error("Invalid CanLoad guard");
                    i = s(e, n);
                  }
                  return Eu(i);
                })
              ).pipe(
                Rh(),
                Gc((t) => {
                  if (!Ph(t)) return;
                  const e = yu(
                    `Redirecting to "${this.urlSerializer.serialize(t)}"`
                  );
                  throw ((e.url = t), e);
                }),
                O((t) => !0 === t)
              )
            : ic(!0);
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return ic(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Qh(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Au(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Su(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            Su(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new Ru(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function Kh(t) {
        const e = {};
        for (const n of Object.keys(t.children)) {
          const r = Kh(t.children[n]);
          (r.segments.length > 0 || r.hasChildren()) && (e[n] = r);
        }
        return (function (t) {
          if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary;
            return new Ru(t.segments.concat(e.segments), e.children);
          }
          return t;
        })(new Ru(t.segments, e));
      }
      class Yh {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Xh {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function td(t, e, n) {
        const r = t._root;
        return nd(r, e ? e._root : null, n, [r.value]);
      }
      function ed(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function nd(
        t,
        e,
        n,
        r,
        s = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = th(e);
        return (
          t.children.forEach((t) => {
            !(function (
              t,
              e,
              n,
              r,
              s = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (o && i.routeConfig === o.routeConfig) {
                const l = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !Mu(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Mu(t.url, e.url) || !bu(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !uh(t, e) || !bu(t.queryParams, e.queryParams);
                    case "paramsChange":
                    default:
                      return !uh(t, e);
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? s.canActivateChecks.push(new Yh(r))
                  : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  nd(t, e, i.component ? (a ? a.children : null) : n, r, s),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    s.canDeactivateChecks.push(new Xh(a.outlet.component, o));
              } else
                o && rd(e, a, s),
                  s.canActivateChecks.push(new Yh(r)),
                  nd(t, null, i.component ? (a ? a.children : null) : n, r, s);
            })(t, i[t.value.outlet], n, r.concat([t.value]), s),
              delete i[t.value.outlet];
          }),
          Su(i, (t, e) => rd(t, n.getContext(e), s)),
          s
        );
      }
      function rd(t, e, n) {
        const r = th(t),
          s = t.value;
        Su(r, (t, r) => {
          rd(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Xh(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      class sd {}
      function id(t) {
        return new y((e) => e.error(t));
      }
      class od {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          const t = Vh(
              this.urlTree.root,
              [],
              [],
              this.config.filter((t) => void 0 === t.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            e = this.processSegmentGroup(this.config, t, gu);
          if (null === e) return null;
          const n = new ih(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              gu,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            r = new Xu(n, e),
            s = new oh(this.url, r);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = sh(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = [];
          for (const s of Object.keys(e.children)) {
            const r = e.children[s],
              i = Hh(t, s),
              o = this.processSegmentGroup(i, r, s);
            if (null === o) return null;
            n.push(...o);
          }
          const r = (function (t) {
            const e = [];
            for (const n of t) {
              if (!ad(n)) {
                e.push(n);
                continue;
              }
              const t = e.find(
                (t) => n.value.routeConfig === t.value.routeConfig
              );
              void 0 !== t ? t.children.push(...n.children) : e.push(n);
            }
            return e;
          })(n);
          return (
            r.sort((t, e) =>
              t.value.outlet === gu
                ? -1
                : e.value.outlet === gu
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            r
          );
        }
        processSegment(t, e, n, r) {
          for (const s of t) {
            const t = this.processSegmentAgainstRoute(s, e, n, r);
            if (null !== t) return t;
          }
          return Bh(e, n, r) ? [] : null;
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo || !zh(t, e, n, r)) return null;
          let s,
            i = [],
            o = [];
          if ("**" === t.path) {
            const r = n.length > 0 ? xu(n).parameters : {};
            s = new ih(
              n,
              r,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              ud(t),
              Nh(t),
              t.component,
              t,
              ld(e),
              cd(e) + n.length,
              hd(t)
            );
          } else {
            const r = Lh(e, t, n);
            if (!r.matched) return null;
            (i = r.consumedSegments),
              (o = n.slice(r.lastChild)),
              (s = new ih(
                i,
                r.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                ud(t),
                Nh(t),
                t.component,
                t,
                ld(e),
                cd(e) + i.length,
                hd(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = Vh(
              e,
              i,
              o,
              a.filter((t) => void 0 === t.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return null === t ? null : [new Xu(s, t)];
          }
          if (0 === a.length && 0 === c.length) return [new Xu(s, [])];
          const u = Nh(t) === r,
            h = this.processSegment(a, l, c, u ? gu : r);
          return null === h ? null : [new Xu(s, h)];
        }
      }
      function ad(t) {
        const e = t.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function ld(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function cd(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function ud(t) {
        return t.data || {};
      }
      function hd(t) {
        return t.resolve || {};
      }
      function dd(t) {
        return yc((e) => {
          const n = t(e);
          return n ? U(n).pipe(O(() => e)) : ic(e);
        });
      }
      class fd extends class {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      const pd = new Rn("ROUTES");
      class gd {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          if (e._loader$) return e._loader$;
          this.onLoadStartListener && this.onLoadStartListener(e);
          const n = this.loadModuleFactory(e.loadChildren).pipe(
            O((n) => {
              this.onLoadEndListener && this.onLoadEndListener(e);
              const r = n.create(t);
              return new Th(
                Cu(r.injector.get(pd, void 0, _t.Self | _t.Optional)).map(Uh),
                r
              );
            }),
            Rc((t) => {
              throw ((e._loader$ = void 0), t);
            })
          );
          return (e._loader$ = new Z(n, () => new x()).pipe(q())), e._loader$;
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? U(this.loader.load(t))
            : Eu(t()).pipe(
                L((t) =>
                  t instanceof Do
                    ? ic(t)
                    : U(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class md {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new _d()),
            (this.attachRef = null);
        }
      }
      class _d {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new md()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class yd {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function vd(t) {
        throw t;
      }
      function bd(t, e, n) {
        return e.parse("/");
      }
      function wd(t, e) {
        return ic(null);
      }
      let Cd = (() => {
          class t {
            constructor(t, e, n, r, s, i, o, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.disposed = !1),
                (this.lastLocationChangeInfo = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new x()),
                (this.errorHandler = vd),
                (this.malformedUriErrorHandler = bd),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: wd,
                  afterPreactivation: wd,
                }),
                (this.urlHandlingStrategy = new yd()),
                (this.routeReuseStrategy = new fd()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "corrected"),
                (this.ngModule = s.get(jo)),
                (this.console = s.get(aa));
              const l = s.get(ba);
              (this.isNgZoneEnabled = l instanceof ba && ba.isInAngularZone()),
                this.resetConfig(a),
                (this.currentUrlTree = new Au(new Ru([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new gd(
                  i,
                  o,
                  (t) => this.triggerEvent(new lu(t)),
                  (t) => this.triggerEvent(new cu(t))
                )),
                (this.routerState = nh(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new oc({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                kc((t) => 0 !== t.id),
                O((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                yc((t) => {
                  let n = !1,
                    r = !1;
                  return ic(t).pipe(
                    Gc((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    yc((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return ic(t).pipe(
                          yc((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new Xc(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue()
                                ? gc
                                : Promise.resolve(t)
                            );
                          }),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (i = this.urlSerializer),
                          (o = this.config),
                          yc((t) =>
                            (function (t, e, n, r, s) {
                              return new Jh(t, e, n, r, s).apply();
                            })(r, s, i, t.extractedUrl, o).pipe(
                              O((e) =>
                                Object.assign(Object.assign({}, t), {
                                  urlAfterRedirects: e,
                                })
                              )
                            )
                          )),
                          Gc((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return L((i) =>
                              (function (
                                t,
                                e,
                                n,
                                r,
                                s = "emptyOnly",
                                i = "legacy"
                              ) {
                                try {
                                  const o = new od(
                                    t,
                                    e,
                                    n,
                                    r,
                                    s,
                                    i
                                  ).recognize();
                                  return null === o ? id(new sd()) : ic(o);
                                } catch (o) {
                                  return id(o);
                                }
                              })(
                                t,
                                e,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                s
                              ).pipe(
                                O((t) =>
                                  Object.assign(Object.assign({}, i), {
                                    targetSnapshot: t,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Gc((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                            const n = new ru(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, i, o;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: i,
                            extras: o,
                          } = t,
                          a = new Xc(n, this.serializeUrl(r), s, i);
                        e.next(a);
                        const l = nh(r, this.rootComponentType).snapshot;
                        return ic(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        gc
                      );
                    }),
                    dd((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    Gc((t) => {
                      const e = new su(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    O((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: td(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return L((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: s,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: o,
                          },
                        } = n;
                        return 0 === o.length && 0 === i.length
                          ? ic(
                              Object.assign(Object.assign({}, n), {
                                guardsResult: !0,
                              })
                            )
                          : (function (t, e, n, r) {
                              return U(t).pipe(
                                L((t) =>
                                  (function (t, e, n, r, s) {
                                    const i =
                                      e && e.routeConfig
                                        ? e.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? ic(
                                          i.map((i) => {
                                            const o = ed(i, e, s);
                                            let a;
                                            if (
                                              (function (t) {
                                                return t && kh(t.canDeactivate);
                                              })(o)
                                            )
                                              a = Eu(
                                                o.canDeactivate(t, e, n, r)
                                              );
                                            else {
                                              if (!kh(o))
                                                throw new Error(
                                                  "Invalid CanDeactivate guard"
                                                );
                                              a = Eu(o(t, e, n, r));
                                            }
                                            return a.pipe(qc());
                                          })
                                        ).pipe(Rh())
                                      : ic(!0);
                                  })(t.component, t.route, n, e, r)
                                ),
                                qc((t) => !0 !== t, !0)
                              );
                            })(o, r, s, t).pipe(
                              L((n) =>
                                n && "boolean" == typeof n
                                  ? (function (t, e, n, r) {
                                      return U(e).pipe(
                                        jc((e) =>
                                          pc(
                                            (function (t, e) {
                                              return (
                                                null !== t && e && e(new uu(t)),
                                                ic(!0)
                                              );
                                            })(e.route.parent, r),
                                            (function (t, e) {
                                              return (
                                                null !== t && e && e(new du(t)),
                                                ic(!0)
                                              );
                                            })(e.route, r),
                                            (function (t, e, n) {
                                              const r = e[e.length - 1],
                                                s = e
                                                  .slice(0, e.length - 1)
                                                  .reverse()
                                                  .map((t) =>
                                                    (function (t) {
                                                      const e = t.routeConfig
                                                        ? t.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return e && 0 !== e.length
                                                        ? { node: t, guards: e }
                                                        : null;
                                                    })(t)
                                                  )
                                                  .filter((t) => null !== t)
                                                  .map((e) =>
                                                    _c(() =>
                                                      ic(
                                                        e.guards.map((s) => {
                                                          const i = ed(
                                                            s,
                                                            e.node,
                                                            n
                                                          );
                                                          let o;
                                                          if (
                                                            (function (t) {
                                                              return (
                                                                t &&
                                                                kh(
                                                                  t.canActivateChild
                                                                )
                                                              );
                                                            })(i)
                                                          )
                                                            o = Eu(
                                                              i.canActivateChild(
                                                                r,
                                                                t
                                                              )
                                                            );
                                                          else {
                                                            if (!kh(i))
                                                              throw new Error(
                                                                "Invalid CanActivateChild guard"
                                                              );
                                                            o = Eu(i(r, t));
                                                          }
                                                          return o.pipe(qc());
                                                        })
                                                      ).pipe(Rh())
                                                    )
                                                  );
                                              return ic(s).pipe(Rh());
                                            })(t, e.path, n),
                                            (function (t, e, n) {
                                              const r = e.routeConfig
                                                ? e.routeConfig.canActivate
                                                : null;
                                              return r && 0 !== r.length
                                                ? ic(
                                                    r.map((r) =>
                                                      _c(() => {
                                                        const s = ed(r, e, n);
                                                        let i;
                                                        if (
                                                          (function (t) {
                                                            return (
                                                              t &&
                                                              kh(t.canActivate)
                                                            );
                                                          })(s)
                                                        )
                                                          i = Eu(
                                                            s.canActivate(e, t)
                                                          );
                                                        else {
                                                          if (!kh(s))
                                                            throw new Error(
                                                              "Invalid CanActivate guard"
                                                            );
                                                          i = Eu(s(e, t));
                                                        }
                                                        return i.pipe(qc());
                                                      })
                                                    )
                                                  ).pipe(Rh())
                                                : ic(!0);
                                            })(t, e.route, n)
                                          )
                                        ),
                                        qc((t) => !0 !== t, !0)
                                      );
                                    })(r, i, t, e)
                                  : ic(n)
                              ),
                              O((t) =>
                                Object.assign(Object.assign({}, n), {
                                  guardsResult: t,
                                })
                              )
                            );
                      });
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    Gc((t) => {
                      if (Ph(t.guardsResult)) {
                        const e = yu(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                      const e = new iu(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    kc((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new eu(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    dd((t) => {
                      if (t.guards.canActivateChecks.length)
                        return ic(t).pipe(
                          Gc((t) => {
                            const e = new ou(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          yc((t) => {
                            let n = !1;
                            return ic(t).pipe(
                              ((r = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              L((t) => {
                                const {
                                  targetSnapshot: e,
                                  guards: { canActivateChecks: n },
                                } = t;
                                if (!n.length) return ic(t);
                                let i = 0;
                                return U(n).pipe(
                                  jc((t) =>
                                    (function (t, e, n, r) {
                                      return (function (t, e, n, r) {
                                        const s = Object.keys(t);
                                        if (0 === s.length) return ic({});
                                        const i = {};
                                        return U(s).pipe(
                                          L((s) =>
                                            (function (t, e, n, r) {
                                              const s = ed(t, e, r);
                                              return Eu(
                                                s.resolve
                                                  ? s.resolve(e, n)
                                                  : s(e, n)
                                              );
                                            })(t[s], e, n, r).pipe(
                                              Gc((t) => {
                                                i[s] = t;
                                              })
                                            )
                                          ),
                                          Dc(1),
                                          L(() =>
                                            Object.keys(i).length === s.length
                                              ? ic(i)
                                              : gc
                                          )
                                        );
                                      })(t._resolve, t, e, r).pipe(
                                        O(
                                          (e) => (
                                            (t._resolvedData = e),
                                            (t.data = Object.assign(
                                              Object.assign({}, t.data),
                                              sh(t, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(t.route, e, r, s)
                                  ),
                                  Gc(() => i++),
                                  Dc(1),
                                  L((e) => (i === n.length ? ic(t) : gc))
                                );
                              })),
                              Gc({
                                next: () => (n = !0),
                                complete: () => {
                                  if (!n) {
                                    const n = new eu(
                                      t.id,
                                      this.serializeUrl(t.extractedUrl),
                                      "At least one route resolver didn't emit any value."
                                    );
                                    e.next(n), t.resolve(!1);
                                  }
                                },
                              })
                            );
                            var r, s;
                          }),
                          Gc((t) => {
                            const e = new au(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                    }),
                    dd((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    O((t) => {
                      const e = (function (t, e, n) {
                        const r = hh(t, e._root, n ? n._root : void 0);
                        return new eh(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    Gc((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((i = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    O(
                      (t) => (
                        new Eh(
                          o,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(i),
                        t
                      )
                    )),
                    Gc({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new eu(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new Jc(s))),
                    Rc((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Ph(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new eu(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new nu(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (i) {
                          t.reject(i);
                        }
                      }
                      var s;
                      return gc;
                    })
                  );
                  var s, i, o, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  const e = this.extractLocationChangeInfoFromEvent(t);
                  this.shouldScheduleNavigation(
                    this.lastLocationChangeInfo,
                    e
                  ) &&
                    setTimeout(() => {
                      const { source: t, state: n, urlTree: r } = e,
                        s = { replaceUrl: !0 };
                      if (n) {
                        const t = Object.assign({}, n);
                        delete t.navigationId,
                          0 !== Object.keys(t).length && (s.state = t);
                      }
                      this.scheduleNavigation(r, t, n, s);
                    }, 0),
                    (this.lastLocationChangeInfo = e);
                }));
            }
            extractLocationChangeInfoFromEvent(t) {
              var e;
              return {
                source: "popstate" === t.type ? "popstate" : "hashchange",
                urlTree: this.parseUrl(t.url),
                state: (
                  null === (e = t.state) || void 0 === e
                    ? void 0
                    : e.navigationId
                )
                  ? t.state
                  : null,
                transitionId: this.getTransition().id,
              };
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0;
              const n = e.urlTree.toString() === t.urlTree.toString();
              return !(
                e.transitionId === t.transitionId &&
                n &&
                (("hashchange" === e.source && "popstate" === t.source) ||
                  ("popstate" === e.source && "hashchange" === t.source))
              );
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              Mh(t),
                (this.config = t.map(Uh)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.transitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(t, e = {}) {
              const {
                  relativeTo: n,
                  queryParams: r,
                  fragment: s,
                  queryParamsHandling: i,
                  preserveFragment: o,
                } = e,
                a = n || this.routerState.root,
                l = o ? this.currentUrlTree.fragment : s;
              let c = null;
              switch (i) {
                case "merge":
                  c = Object.assign(
                    Object.assign({}, this.currentUrlTree.queryParams),
                    r
                  );
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = r || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return gh(e.root, e.root, e, r, s);
                  const i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new _h(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            Su(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new _h(n, e, r);
                  })(n);
                  if (i.toRoot()) return gh(e.root, new Ru([], {}), e, r, s);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new yh(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new yh(t, t === e.root, 0);
                      }
                      const r = fh(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          i = n;
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new yh(r, !1, s - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(i, e, t),
                    a = o.processChildren
                      ? bh(o.segmentGroup, o.index, i.commands)
                      : vh(o.segmentGroup, o.index, i.commands);
                  return gh(o.segmentGroup, a, e, r, s);
                })(a, this.currentUrlTree, t, c, l)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              const n = Ph(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (Ph(t)) return Ou(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return Ou(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new tu(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              if (this.disposed) return Promise.resolve(!1);
              const i = this.getTransition(),
                o =
                  "imperative" !== e &&
                  "imperative" === (null == i ? void 0 : i.source),
                a =
                  (this.lastSuccessfulId === i.id || this.currentNavigation
                    ? i.rawUrl
                    : i.urlAfterRedirects
                  ).toString() === t.toString();
              if (o && a) return Promise.resolve(!0);
              let l, c, u;
              s
                ? ((l = s.resolve), (c = s.reject), (u = s.promise))
                : (u = new Promise((t, e) => {
                    (l = t), (c = e);
                  }));
              const h = ++this.navigationId;
              return (
                this.setTransition({
                  id: h,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: l,
                  reject: c,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Gn(Mn),
                Gn(ju),
                Gn(_d),
                Gn(fl),
                Gn(Xs),
                Gn($a),
                Gn(_a),
                Gn(void 0)
              );
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        xd = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = s),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new Yo()),
                (this.deactivateEvents = new Yo()),
                (this.name = r || gu),
                t.onChildOutletCreated(this.name, this);
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }
            get isActivated() {
              return !!this.activated;
            }
            get component() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this.activated.instance;
            }
            get activatedRoute() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this._activatedRoute;
            }
            get activatedRouteData() {
              return this._activatedRoute
                ? this._activatedRoute.snapshot.data
                : {};
            }
            detach() {
              if (!this.activated) throw new Error("Outlet is not activated");
              this.location.detach();
              const t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }
            attach(t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }
            deactivate() {
              if (this.activated) {
                const t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }
            activateWith(t, e) {
              if (this.isActivated)
                throw new Error("Cannot activate an already activated outlet");
              this._activatedRoute = t;
              const n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new Sd(t, r, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                s
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                ui(_d),
                ui(No),
                ui(Ji),
                ("name",
                (function (t, e) {
                  const n = t.attrs;
                  if (n) {
                    const t = n.length;
                    let r = 0;
                    for (; r < t; ) {
                      const s = n[r];
                      if (rn(s)) break;
                      if (0 === s) r += 2;
                      else if ("number" == typeof s)
                        for (r++; r < t && "string" == typeof n[r]; ) r++;
                      else {
                        if (s === e) return n[r + 1];
                        r += 2;
                      }
                    }
                  }
                  return null;
                })(Ee(), "name")),
                ui(Oo)
              );
            }),
            (t.ɵdir = qt({
              type: t,
              selectors: [["router-outlet"]],
              outputs: {
                activateEvents: "activate",
                deactivateEvents: "deactivate",
              },
              exportAs: ["outlet"],
            })),
            t
          );
        })();
      class Sd {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === rh
            ? this.route
            : t === _d
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Ed {}
      class Od {
        preload(t, e) {
          return ic(null);
        }
      }
      let Td = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new gd(
                  e,
                  n,
                  (e) => t.triggerEvent(new lu(e)),
                  (e) => t.triggerEvent(new cu(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  kc((t) => t instanceof tu),
                  jc(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(jo);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return U(n).pipe(
                z(),
                O((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                (e._loadedConfig
                  ? ic(e._loadedConfig)
                  : this.loader.load(t.injector, e)
                ).pipe(
                  L(
                    (t) => (
                      (e._loadedConfig = t),
                      this.processRoutes(t.module, t.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(Cd), Gn($a), Gn(_a), Gn(Xs), Gn(Ed));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        kd = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Xc
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof tu &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof pu &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new pu(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Gn(Cd), Gn(kl), Gn(void 0));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Pd = new Rn("ROUTER_CONFIGURATION"),
        Ad = new Rn("ROUTER_FORROOT_GUARD"),
        Rd = [
          fl,
          { provide: ju, useClass: Du },
          {
            provide: Cd,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, c) {
              const u = new Cd(null, t, e, n, r, s, i, Cu(o));
              if (
                (l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy);
                })(a, u),
                a.enableTracing)
              ) {
                const t = Ka();
                u.events.subscribe((e) => {
                  t.logGroup(`Router Event: ${e.constructor.name}`),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return u;
            },
            deps: [
              ju,
              _d,
              fl,
              Xs,
              $a,
              _a,
              pd,
              Pd,
              [class {}, new Kn()],
              [class {}, new Kn()],
            ],
          },
          _d,
          {
            provide: rh,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [Cd],
          },
          { provide: $a, useClass: qa },
          Td,
          Od,
          class {
            preload(t, e) {
              return e().pipe(Rc(() => ic(null)));
            }
          },
          { provide: Pd, useValue: { enableTracing: !1 } },
        ];
      function Id() {
        return new Da("Router", Cd);
      }
      let Md = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                Rd,
                Nd(e),
                {
                  provide: Ad,
                  useFactory: Ud,
                  deps: [[Cd, new Kn(), new Yn()]],
                },
                { provide: Pd, useValue: n || {} },
                {
                  provide: ll,
                  useFactory: Dd,
                  deps: [Xa, [new Jn(ul), new Kn()], Pd],
                },
                { provide: kd, useFactory: jd, deps: [Cd, kl, Pd] },
                {
                  provide: Ed,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Od,
                },
                { provide: Da, multi: !0, useFactory: Id },
                [
                  Hd,
                  { provide: Xo, multi: !0, useFactory: Fd, deps: [Hd] },
                  { provide: Vd, useFactory: Ld, deps: [Hd] },
                  { provide: oa, multi: !0, useExisting: Vd },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [Nd(e)] };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Ad, 8), Gn(Cd, 8));
          }),
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = ct({})),
          t
        );
      })();
      function jd(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new kd(t, e, n);
      }
      function Dd(t, e, n = {}) {
        return n.useHash ? new dl(t, e) : new hl(t, e);
      }
      function Ud(t) {
        return "guarded";
      }
      function Nd(t) {
        return [
          { provide: In, multi: !0, useValue: t },
          { provide: pd, multi: !0, useValue: t },
        ];
      }
      let Hd = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new x());
          }
          appInitializer() {
            return this.injector.get(el, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(Cd),
                r = this.injector.get(Pd);
              return (
                "disabled" === r.initialNavigation
                  ? (n.setUpLocationChangeListener(), t(!0))
                  : "enabled" === r.initialNavigation ||
                    "enabledBlocking" === r.initialNavigation
                  ? ((n.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? ic(null)
                        : ((this.initNavigation = !0),
                          t(!0),
                          this.resultOfPreactivationDone)),
                    n.initialNavigation())
                  : t(!0),
                e
              );
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(Pd),
              n = this.injector.get(Td),
              r = this.injector.get(kd),
              s = this.injector.get(Cd),
              i = this.injector.get(La);
            t === i.components[0] &&
              (("enabledNonBlocking" !== e.initialNavigation &&
                void 0 !== e.initialNavigation) ||
                s.initialNavigation(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Gn(Xs));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Fd(t) {
        return t.appInitializer.bind(t);
      }
      function Ld(t) {
        return t.bootstrapListener.bind(t);
      }
      const Vd = new Rn("Router Initializer"),
        $d = [];
      let zd = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = ct({ imports: [[Md.forRoot($d)], Md] })),
            t
          );
        })(),
        Bd = (() => {
          class t {
            constructor() {
              this.title = "Elena Pistruga";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [["app-root"]],
              decls: 26,
              vars: 3,
              consts: [
                [1, "container-fluid", "bg-light"],
                [
                  1,
                  "navbar",
                  "navbar-expand-lg",
                  "navbar-light",
                  "sticky-top",
                  "bg-light",
                ],
                [1, "container"],
                ["href", "#", 1, "navbar-brand"],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#navbarSupportedContent",
                  "aria-controls",
                  "navbarSupportedContent",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "fas", "fa-angle-double-down"],
                [
                  "id",
                  "navbarSupportedContent",
                  1,
                  "collapse",
                  "navbar-collapse",
                  "col-md-3",
                  "offset-md-6",
                ],
                [1, "navbar-nav", "me-auto", "mb-2", "mb-lg-0"],
                [1, "nav-item"],
                ["href", "#", 1, "nav-link"],
              ],
              template: function (t, e) {
                1 & t &&
                  (fi(0, "div", 0),
                  fi(1, "nav", 1),
                  fi(2, "div", 2),
                  fi(3, "a", 3),
                  Ni(4),
                  (function (t, e) {
                    const n = Se();
                    let r;
                    n.firstCreatePass
                      ? ((r = (function (t, e) {
                          if (e)
                            for (let n = e.length - 1; n >= 0; n--) {
                              const r = e[n];
                              if (t === r.name) return r;
                            }
                          throw new st(
                            "302",
                            `The pipe '${t}' could not be found!`
                          );
                        })("uppercase", n.pipeRegistry)),
                        (n.data[25] = r),
                        r.onDestroy &&
                          (n.destroyHooks || (n.destroyHooks = [])).push(
                            25,
                            r.onDestroy
                          ))
                      : (r = n.data[25]);
                    const s = r.factory || (r.factory = re(r.type)),
                      i = vt(ui);
                    try {
                      const t = dn(!1),
                        e = s();
                      dn(t),
                        (function (t, e, n, r) {
                          25 >= t.data.length &&
                            ((t.data[25] = null), (t.blueprint[25] = null)),
                            (e[25] = r);
                        })(n, xe(), 0, e);
                    } finally {
                      vt(i);
                    }
                  })(),
                  pi(),
                  fi(6, "button", 4),
                  gi(7, "i", 5),
                  pi(),
                  fi(8, "div", 6),
                  fi(9, "ul", 7),
                  fi(10, "li", 8),
                  fi(11, "a", 9),
                  Ni(12, "Experience"),
                  pi(),
                  pi(),
                  fi(13, "li", 8),
                  fi(14, "a", 9),
                  Ni(15, "Skills"),
                  pi(),
                  pi(),
                  fi(16, "li", 8),
                  fi(17, "a", 9),
                  Ni(18, "Portfolio"),
                  pi(),
                  pi(),
                  fi(19, "li", 8),
                  fi(20, "a", 9),
                  Ni(21, "Contact"),
                  pi(),
                  pi(),
                  pi(),
                  pi(),
                  pi(),
                  pi(),
                  gi(22, "app-intro"),
                  gi(23, "app-experience"),
                  gi(24, "app-skills"),
                  gi(25, "app-portfolio"),
                  pi()),
                  2 & t &&
                    (Qr(4),
                    Hi(
                      (function (t, e, n) {
                        const r = t + Qt,
                          s = xe(),
                          i = (function (t, e) {
                            return t[e];
                          })(s, r);
                        return (function (t, e) {
                          return (
                            ri.isWrapped(e) &&
                              ((e = ri.unwrap(e)),
                              (t[we.lFrame.bindingIndex] = Zr)),
                            e
                          );
                        })(
                          s,
                          (function (t, e) {
                            return t[1].data[e].pure;
                          })(s, r)
                            ? (function (t, e, n, r, s, i) {
                                const o = e + n;
                                return ai(t, o, s)
                                  ? oi(t, o + 1, i ? r.call(i, s) : r(s))
                                  : Ko(t, o + 1);
                              })(s, Re(), e, i.transform, n, i)
                            : i.transform(n)
                        );
                      })(5, 1, e.title)
                    ));
              },
              styles: [
                ".btn[_ngcontent-%COMP%], .nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%], .text-header[_ngcontent-%COMP%]{font-family:Voltaire,sans-serif}div[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#293a34}a[_ngcontent-%COMP%]{text-decoration:none;color:#d2d8cc}a[_ngcontent-%COMP%]:hover{color:#293a34}.btn[_ngcontent-%COMP%]{margin:10px;background-color:#293a34;color:#d2d8cc;font-size:30px}.btn[_ngcontent-%COMP%]:hover{background-color:#d2d8cc;color:#293a34;transition:.5s}.btn[_ngcontent-%COMP%]:focus{outline:none;box-shadow:none}.card-title[_ngcontent-%COMP%]{font-weight:600}.nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{color:#5a6d47;font-size:25px}.navbar-toggler[_ngcontent-%COMP%]{border:none;font-size:2rem}.text-muted[_ngcontent-%COMP%]{color:#667d60!important}.text-header[_ngcontent-%COMP%]{color:#435a4a;margin:20px 0}",
              ],
            })),
            t
          );
        })(),
        qd = (() => {
          class t {
            constructor() {
              this.resumeInfo = {
                basics: {
                  name: "Elena Pistruga",
                  label: "Developer",
                  picture: "assets/images/Lenke.jpg",
                  email: "elena.pistruga@gmail.com",
                  phone: "",
                  website: "",
                  summary:
                    "I am Elena - an aspiring Front-End Developer, passionate about Angular and Web Technologies!",
                  location: {
                    city: "Chisinau",
                    country: "Republic of Moldova",
                    countryCode: "MD",
                  },
                  profiles: [
                    {
                      network: "Linkedin",
                      url: "https://www.linkedin.com/in/elenapistruga",
                    },
                  ],
                },
                work: [
                  {
                    company: "Pedersen & Partners",
                    position: "Research Associate, Europe & APAC",
                    website: "http://pedersenandpartners.com",
                    startDate: "September 2014",
                    endDate: "January 2018",
                    summary: "Description...",
                  },
                  {
                    company: "Pedersen & Partners",
                    position: "Research Analyst ",
                    website: "http://pedersenandpartners.com",
                    startDate: "September 2013",
                    endDate: "September 2014",
                    summary: "Description...",
                  },
                ],
                education: [
                  {
                    institution: "Academy of Economic Studies of Moldova",
                    area: "Finance and Banking",
                    studyType: "Bachelor",
                    startDate: "September 2010",
                    endDate: "May 2013",
                    courses: [
                      {
                        institution: "Tekwill",
                        title: "Web Development",
                        endDate: "February 2020",
                        summary: "Description...",
                      },
                      {
                        institution: "Udemy",
                        title:
                          "The Complete JavaScript Course 2021: From Zero to Expert! by Jonas Schmedtmann",
                        endDate: "October 2020",
                        summary: "Description...",
                      },
                      {
                        institution: "Pluralsight",
                        title: "Angular Getting Started by Deborah Kurata",
                        endDate: "March 2021",
                        summary: "Description...",
                      },
                      {
                        institution: "Pluralsight",
                        title:
                          "Object-oriented Programming in JavaScript - ES6 by Mark Zamoyta",
                        endDate: "February 2021",
                        summary: "Description...",
                      },
                      {
                        institution: "Pluralsight",
                        title:
                          "TypeScript Fundamentals by John Papa and Dan Wahlin",
                        endDate: "February 2021",
                        summary: "Description...",
                      },
                    ],
                  },
                ],
                skills: [
                  {
                    keywords: [
                      "HTML",
                      "CSS",
                      "Bootstrap",
                      "Javascript",
                      "TypeScript",
                      "Angular",
                      "GitHub",
                      "PHP",
                      "Laravel",
                      "Laravel Voyager",
                    ],
                  },
                ],
                languages: [
                  { language: "Romanian", fluency: "Native" },
                  { language: "Russian", fluency: "Native" },
                  { language: "English", fluency: "Fluent" },
                  { language: "French", fluency: "Upper Intermediate (B2)" },
                ],
              };
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [["app-intro"]],
              decls: 11,
              vars: 1,
              consts: [
                [1, "row"],
                [
                  1,
                  "intro-left-container",
                  "col",
                  "d-flex",
                  "justify-content-center",
                ],
                [
                  "src",
                  "assets/images/pexels-light-leaf-2.jpg",
                  1,
                  "intro-pic-1",
                ],
                [
                  "src",
                  "assets/images/pexels-light-ficus.jpg",
                  1,
                  "intro-pic-2",
                ],
                ["src", "assets/images/Lenke.jpg", 1, "intro-avatar"],
                [1, "col", "d-flex", "align-items-center"],
                [1, "intro-text", "col-md-10"],
                [1, "intro-text-header"],
                [1, "intro-text-parag"],
              ],
              template: function (t, e) {
                1 & t &&
                  (fi(0, "div", 0),
                  fi(1, "div", 1),
                  gi(2, "img", 2),
                  gi(3, "img", 3),
                  gi(4, "img", 4),
                  pi(),
                  fi(5, "div", 5),
                  fi(6, "div", 6),
                  fi(7, "h1", 7),
                  Ni(8, " Hello and welcome!"),
                  pi(),
                  fi(9, "p", 8),
                  Ni(10),
                  pi(),
                  pi(),
                  pi(),
                  pi()),
                  2 & t && (Qr(10), Hi(e.resumeInfo.basics.summary));
              },
              styles: [
                ".intro-left-container[_ngcontent-%COMP%]{position:relative;height:100vh}.intro-pic-1[_ngcontent-%COMP%]{position:absolute;top:10vh;right:30vh;max-height:450px;border:1px solid #f8f9fa}.intro-pic-2[_ngcontent-%COMP%]{display:none}.intro-avatar[_ngcontent-%COMP%]{position:absolute;top:20vh;right:20vh;max-height:450px;border:1px solid #f8f9fa}.intro-text[_ngcontent-%COMP%]{color:#4f5f3e;font-family:Voltaire,sans-serif}.intro-text-header[_ngcontent-%COMP%]{font-size:5rem}.intro-text-parag[_ngcontent-%COMP%]{font-size:2.5rem}@media screen and (max-width:1024px){.intro-pic-2[_ngcontent-%COMP%]{display:flex;object-fit:cover;width:100vw;position:relative;border:1px solid #f8f9fa}.intro-avatar[_ngcontent-%COMP%], .intro-pic-1[_ngcontent-%COMP%]{display:none}.intro-text[_ngcontent-%COMP%]{position:absolute;top:25%;left:5%;width:90%;color:#f8f9fa;font-family:Voltaire,sans-serif;text-align:center;text-shadow:3px 3px 5px #293a34}.intro-text-header[_ngcontent-%COMP%]{font-size:5rem}.intro-text-parag[_ngcontent-%COMP%]{font-size:4rem}}@media screen and (max-width:823px){.intro-text[_ngcontent-%COMP%]{position:absolute;top:20%;right:5%;width:auto}.intro-text-header[_ngcontent-%COMP%]{font-size:4rem}.intro-text-parag[_ngcontent-%COMP%]{font-size:3rem}}@media screen and (max-width:670px){.intro-text[_ngcontent-%COMP%]{position:absolute;top:25%}.intro-text-header[_ngcontent-%COMP%]{font-size:3.5rem}.intro-text-parag[_ngcontent-%COMP%]{font-size:2.5rem}}@media screen and (max-width:570px){.intro-text[_ngcontent-%COMP%]{position:absolute;top:25%}.intro-text-header[_ngcontent-%COMP%]{font-size:3rem}.intro-text-parag[_ngcontent-%COMP%]{font-size:2rem}}@media screen and (max-width:360px){.intro-text[_ngcontent-%COMP%]{position:absolute;top:20%}}",
                ".btn[_ngcontent-%COMP%], .nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%], .text-header[_ngcontent-%COMP%]{font-family:Voltaire,sans-serif}div[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#293a34}a[_ngcontent-%COMP%]{text-decoration:none;color:#d2d8cc}a[_ngcontent-%COMP%]:hover{color:#293a34}.btn[_ngcontent-%COMP%]{margin:10px;background-color:#293a34;color:#d2d8cc;font-size:30px}.btn[_ngcontent-%COMP%]:hover{background-color:#d2d8cc;color:#293a34;transition:.5s}.btn[_ngcontent-%COMP%]:focus{outline:none;box-shadow:none}.card-title[_ngcontent-%COMP%]{font-weight:600}.nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{color:#5a6d47;font-size:25px}.navbar-toggler[_ngcontent-%COMP%]{border:none;font-size:2rem}.text-muted[_ngcontent-%COMP%]{color:#667d60!important}.text-header[_ngcontent-%COMP%]{color:#435a4a;margin:20px 0}",
              ],
            })),
            t
          );
        })(),
        Wd = (() => {
          class t {
            constructor() {
              this.btnWidth = 250;
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [["app-experience"]],
              decls: 50,
              vars: 2,
              consts: [
                [1, "container"],
                [1, "row", "align-items-center"],
                [1, "col-lg", "align-self-center", "text-center"],
                [1, "text-header"],
                [1, "col-lg"],
                [1, "timeline"],
                [1, "card", "border-0", "timeline-box", "left"],
                [1, "card-body"],
                [1, "date"],
                [1, "card-title"],
                [1, "card-subtitle", "mb-2", "text-muted"],
                [1, "card", "border-0", "timeline-box", "right"],
                [1, "row", "justify-content-center"],
                [
                  "download",
                  "Elena-Pistruga-CV.pdf",
                  "href",
                  "./assets/doc/jbrlpsfrtvw274r8fikjl.pdf",
                  "target",
                  "_blank",
                  1,
                  "btn",
                  "rounded-pill",
                  "btn-lg",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (fi(0, "div", 0),
                  fi(1, "div", 1),
                  fi(2, "div", 2),
                  fi(3, "h1", 3),
                  Ni(4, "My experience"),
                  pi(),
                  pi(),
                  fi(5, "div", 4),
                  fi(6, "div", 5),
                  fi(7, "div", 6),
                  fi(8, "div", 7),
                  fi(9, "div", 8),
                  Ni(10, "2018"),
                  pi(),
                  fi(11, "h5", 9),
                  Ni(12, "Maternity Leave"),
                  pi(),
                  fi(13, "h6", 10),
                  Ni(14, "Chisinau"),
                  pi(),
                  pi(),
                  pi(),
                  fi(15, "div", 11),
                  fi(16, "div", 7),
                  fi(17, "div", 8),
                  Ni(18, "2014"),
                  pi(),
                  fi(19, "h5", 9),
                  Ni(20, "Research Associate"),
                  pi(),
                  fi(21, "h6", 10),
                  Ni(22, "Pedersen & Partners, Chisinau & Singapore"),
                  pi(),
                  pi(),
                  pi(),
                  fi(23, "div", 6),
                  fi(24, "div", 7),
                  fi(25, "div", 8),
                  Ni(26, "2013"),
                  pi(),
                  fi(27, "h5", 9),
                  Ni(28, "Research Analyst, Shared Resources Center"),
                  pi(),
                  fi(29, "h6", 10),
                  Ni(30, "Pedersen & Partners, Chisinau"),
                  pi(),
                  pi(),
                  pi(),
                  fi(31, "div", 11),
                  fi(32, "div", 7),
                  fi(33, "div", 8),
                  Ni(34, "2013"),
                  pi(),
                  fi(35, "h5", 9),
                  Ni(36, "Sales Agent and Customer Service"),
                  pi(),
                  fi(37, "h6", 10),
                  Ni(38, "Brainstrom Cafe (ex-Erudit Club), Chisinau"),
                  pi(),
                  pi(),
                  pi(),
                  fi(39, "div", 6),
                  fi(40, "div", 7),
                  fi(41, "div", 8),
                  Ni(42, "2011"),
                  pi(),
                  fi(43, "h5", 9),
                  Ni(44, "Call-Center Customer Service Specialist"),
                  pi(),
                  fi(45, "h6", 10),
                  Ni(46, 'BC "Universalbank" SA, Chisinau'),
                  pi(),
                  pi(),
                  pi(),
                  pi(),
                  fi(47, "div", 12),
                  fi(48, "a", 13),
                  Ni(49, "Download CV"),
                  pi(),
                  pi(),
                  pi(),
                  pi(),
                  pi()),
                  2 & t && (Qr(48), Ti("width", e.btnWidth, "px"));
              },
              styles: [
                '.timeline[_ngcontent-%COMP%]{position:relative;width:100%;margin:0 auto;padding:15px 0}.timeline[_ngcontent-%COMP%]:after{content:"";position:absolute;width:2px;background-image:linear-gradient(#d2d8cc,#293a34,#293a34,#293a34,#293a34,#d2d8cc);top:0;bottom:0;left:50%;margin-left:-1px}.timeline-box[_ngcontent-%COMP%]{padding:15px 30px;position:relative;background:inherit;width:50%}.timeline-box[_ngcontent-%COMP%]:hover{background-color:#d2d8cc;transition:1s;cursor:default}.timeline-box.left[_ngcontent-%COMP%]{left:0}.timeline-box.right[_ngcontent-%COMP%]{left:50%}.timeline-box[_ngcontent-%COMP%]:after{content:"";position:absolute;width:16px;height:16px;top:calc(50% - 8px);right:-8px;background:#d2d8cc;border:2px solid #293a34;border-radius:16px;z-index:1}.timeline-box.right[_ngcontent-%COMP%]:after{left:-8px}.timeline-box[_ngcontent-%COMP%]:before{content:"";position:absolute;width:30px;height:2px;top:calc(50% - 1px);right:8px;background:#293a34;z-index:1}.timeline-box.right[_ngcontent-%COMP%]:before{left:8px}.timeline-box[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{position:absolute;display:inline-block;top:calc(50% - 12px);text-align:center;font-size:14px;font-weight:700;color:#667d60;text-transform:uppercase;letter-spacing:1px;z-index:1}.timeline-box.left[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{right:-65px}.timeline-box.right[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{left:-65px}@media (max-width:823px){.timeline[_ngcontent-%COMP%]:after{left:90px}.timeline-box[_ngcontent-%COMP%]{width:100%;padding-left:120px;padding-right:30px}.timeline-box.right[_ngcontent-%COMP%]{left:0}.timeline-box.left[_ngcontent-%COMP%]:after, .timeline-box.right[_ngcontent-%COMP%]:after{left:82px}.timeline-box.left[_ngcontent-%COMP%]:before, .timeline-box.right[_ngcontent-%COMP%]:before{left:95px;border-color:transparent #006e51 transparent transparent}.timeline-box.left[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%], .timeline-box.right[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{right:auto;left:15px}}',
                ".btn[_ngcontent-%COMP%], .nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%], .text-header[_ngcontent-%COMP%]{font-family:Voltaire,sans-serif}div[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#293a34}a[_ngcontent-%COMP%]{text-decoration:none;color:#d2d8cc}a[_ngcontent-%COMP%]:hover{color:#293a34}.btn[_ngcontent-%COMP%]{margin:10px;background-color:#293a34;color:#d2d8cc;font-size:30px}.btn[_ngcontent-%COMP%]:hover{background-color:#d2d8cc;color:#293a34;transition:.5s}.btn[_ngcontent-%COMP%]:focus{outline:none;box-shadow:none}.card-title[_ngcontent-%COMP%]{font-weight:600}.nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{color:#5a6d47;font-size:25px}.navbar-toggler[_ngcontent-%COMP%]{border:none;font-size:2rem}.text-muted[_ngcontent-%COMP%]{color:#667d60!important}.text-header[_ngcontent-%COMP%]{color:#435a4a;margin:20px 0}",
              ],
            })),
            t
          );
        })();
      const Gd = function (t, e) {
        return { even: t, odd: e };
      };
      function Zd(t, e) {
        if (
          (1 & t &&
            (fi(0, "div", 5),
            fi(1, "div", 6),
            gi(2, "img", 7),
            pi(),
            fi(3, "div", 8),
            fi(4, "div", 9),
            fi(5, "h4", 10),
            Ni(6),
            pi(),
            gi(7, "hr"),
            fi(8, "p", 11),
            Ni(9),
            pi(),
            fi(10, "a", 12),
            Ni(11, "Go to Website"),
            pi(),
            gi(12, "br"),
            fi(13, "a", 12),
            gi(14, "i", 13),
            pi(),
            pi(),
            pi(),
            pi()),
          2 & t)
        ) {
          const t = e.$implicit;
          hi(
            "ngClass",
            ((n = 6),
            (r = Gd),
            (s = e.even),
            (i = e.odd),
            (function (t, e, n, r, s, i, o) {
              const a = e + n;
              return (function (t, e, n, r) {
                const s = ai(t, e, n);
                return ai(t, e + 1, r) || s;
              })(t, a, s, i)
                ? oi(t, a + 2, o ? r.call(o, s, i) : r(s, i))
                : Ko(t, a + 2);
            })(xe(), Re(), n, r, s, i, o))
          ),
            Qr(2),
            yi("src", t.imageUrl, sr),
            Qr(4),
            Fi(" ", t.title, " "),
            Qr(3),
            Fi(" ", t.description, " "),
            Qr(1),
            yi("href", t.URL, sr),
            Qr(3),
            yi("href", t.gitHub, sr);
        }
        var n, r, s, i, o;
      }
      let Qd = (() => {
        class t {
          constructor() {
            this.projects = [
              {
                title: "Personal Website",
                description:
                  "My personal portfolio website for showcasing my experience, CV, as well as blog articles. Built with Angular and Bootstrap.",
                imageUrl: "assets/images/pexels-light-coffee.jpg",
                URL: "",
                gitHub: "https://github.com/zelenkis/elenas-website",
              },
              {
                title: "Textile Services MD",
                description:
                  "A website tailored for a family business that offers home and office textile services. The webiste consists of a landing page and a gallery view. Built with Laravel and Bootstrap.",
                imageUrl:
                  "assets/images/pexels-light-eucalyptus-coffee-cup.jpg",
                URL: "#",
                gitHub: "https://github.com/zelenkis/textileservices",
              },
            ];
          }
          ngOnInit() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = Ft({
            type: t,
            selectors: [["app-portfolio"]],
            decls: 6,
            vars: 1,
            consts: [
              [1, "container"],
              [1, "col"],
              [1, "row", "text-center"],
              [1, "text-header"],
              ["class", "parentrow row", 3, "ngClass", 4, "ngFor", "ngForOf"],
              [1, "parentrow", "row", 3, "ngClass"],
              [1, "imagecol", "col"],
              [1, "portfolio-img", "img-fluid", 3, "src"],
              [1, "col", "align-self-center", "text-center"],
              [1, "textcol", "mx-auto"],
              [1, "portfolio-title"],
              [1, "portfolio-text"],
              ["target", "_blank", 1, "text-muted", 3, "href"],
              [1, "fab", "fa-github-square"],
            ],
            template: function (t, e) {
              1 & t &&
                (fi(0, "div", 0),
                fi(1, "div", 1),
                fi(2, "div", 2),
                fi(3, "h1", 3),
                Ni(4, "Portfolio"),
                pi(),
                pi(),
                ci(5, Zd, 15, 9, "div", 4),
                pi(),
                pi()),
                2 & t && (Qr(5), hi("ngForOf", e.projects));
            },
            directives: [wl, vl],
            styles: [
              ".portfolio-img[_ngcontent-%COMP%]{height:auto;object-fit:cover}.imagecol[_ngcontent-%COMP%]{overflow:hidden}.imagecol[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transform:scale(1);transition:.3s ease-in-out}.imagecol[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%]{transform:scale(1.3)}.portfolio-title[_ngcontent-%COMP%]{font-family:Voltaire,sans-serif;font-size:30px}.text-muted[_ngcontent-%COMP%]{text-decoration:underline}.parentrow[_ngcontent-%COMP%]{--bs-gutter-x:0!important}.textcol[_ngcontent-%COMP%]{width:300px}",
              ".btn[_ngcontent-%COMP%], .nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%], .text-header[_ngcontent-%COMP%]{font-family:Voltaire,sans-serif}div[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#293a34}a[_ngcontent-%COMP%]{text-decoration:none;color:#d2d8cc}a[_ngcontent-%COMP%]:hover{color:#293a34}.btn[_ngcontent-%COMP%]{margin:10px;background-color:#293a34;color:#d2d8cc;font-size:30px}.btn[_ngcontent-%COMP%]:hover{background-color:#d2d8cc;color:#293a34;transition:.5s}.btn[_ngcontent-%COMP%]:focus{outline:none;box-shadow:none}.card-title[_ngcontent-%COMP%]{font-weight:600}.nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{color:#5a6d47;font-size:25px}.navbar-toggler[_ngcontent-%COMP%]{border:none;font-size:2rem}.text-muted[_ngcontent-%COMP%]{color:#667d60!important}.text-header[_ngcontent-%COMP%]{color:#435a4a;margin:20px 0}",
              ".odd[_ngcontent-%COMP%]{\n    flex-direction: row-reverse !important;\n    \n  }",
            ],
          })),
          t
        );
      })();
      function Jd(t, e) {
        1 & t && gi(0, "i"),
          2 & t &&
            (function (t, e, n, r) {
              const s = Se(),
                i = Me(2);
              s.firstUpdatePass && Ai(s, null, i, r);
              const o = xe();
              if (n !== Zr && ai(o, i, n)) {
                const a = s.data[qe()];
                if (Ui(a, r) && !Pi(s, i)) {
                  let t = a.classesWithoutHost;
                  null !== t && (n = tt(t, n || "")), di(s, a, o, n, r);
                } else
                  !(function (t, e, n, r, s, i, o, a) {
                    s === Zr && (s = bi);
                    let l = 0,
                      c = 0,
                      u = 0 < s.length ? s[0] : null,
                      h = 0 < i.length ? i[0] : null;
                    for (; null !== u || null !== h; ) {
                      const o = l < s.length ? s[l + 1] : void 0,
                        d = c < i.length ? i[c + 1] : void 0;
                      let f,
                        p = null;
                      u === h
                        ? ((l += 2), (c += 2), o !== d && ((p = h), (f = d)))
                        : null === h || (null !== u && u < h)
                        ? ((l += 2), (p = u))
                        : ((c += 2), (p = h), (f = d)),
                        null !== p && Mi(t, e, n, r, p, f, !0, a),
                        (u = l < s.length ? s[l] : null),
                        (h = c < i.length ? i[c] : null);
                    }
                  })(
                    s,
                    a,
                    o,
                    o[11],
                    o[i + 1],
                    (o[i + 1] = (function (t, e, n) {
                      if (null == n || "" === n) return bi;
                      const r = [],
                        s = tr(n);
                      if (Array.isArray(s))
                        for (let i = 0; i < s.length; i++) t(r, s[i], !0);
                      else if ("object" == typeof s)
                        for (const i in s) s.hasOwnProperty(i) && t(r, i, s[i]);
                      else "string" == typeof s && e(r, s);
                      return r;
                    })(t, e, n)),
                    0,
                    i
                  );
              }
            })(Nn, ki, _i().$implicit.icon, !0);
      }
      function Kd(t, e) {
        if (
          (1 & t && (fi(0, "button", 6), Ni(1), ci(2, Jd, 1, 3, "i", 7), pi()),
          2 & t)
        ) {
          const t = e.$implicit;
          Ti("cursor", _i().btnCursor),
            Qr(1),
            Fi(" ", t.title, " "),
            Qr(1),
            hi("ngIf", t.icon && t.icon.length);
        }
      }
      let Yd = (() => {
          class t {
            constructor() {
              (this.btnCursor = "default"),
                (this.btnColor = "#667D60"),
                (this.skillsInfo = {
                  skills: [
                    { title: "HTML", icon: "fab fa-html5" },
                    { title: "CSS", icon: "fab fa-css3-alt" },
                    { title: "Bootstrap", icon: "fab fa-bootstrap" },
                    { title: "JavaScript", icon: "fab fa-js-square" },
                    { title: "TypeScript" },
                    { title: "Angular", icon: "fab fa-angular" },
                    { title: "GitHub", icon: "fab fa-github-square" },
                    { title: "npm", icon: "fab fa-npm" },
                    { title: "PHP", icon: "fab fa-php" },
                    { title: "Laravel", icon: "fab fa-laravel" },
                    { title: "Laravel Voyager", icon: "fas fa-dharmachakra" },
                    { title: "Visual Studio Code" },
                    { title: "Adobe Photoshop" },
                  ],
                });
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [["app-skills"]],
              decls: 7,
              vars: 1,
              consts: [
                [1, "container"],
                [
                  1,
                  "row",
                  "d-flex",
                  "flex-row-reverse",
                  "bd-highlight",
                  2,
                  "height",
                  "60vh",
                ],
                [1, "col-xl", "align-self-center", "text-center"],
                [1, "text-header"],
                [1, "col-xl", "align-self-center"],
                [
                  "type",
                  "button",
                  "class",
                  "btn rounded-pill",
                  3,
                  "cursor",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                ["type", "button", 1, "btn", "rounded-pill"],
                [3, "class", 4, "ngIf"],
              ],
              template: function (t, e) {
                1 & t &&
                  (fi(0, "div", 0),
                  fi(1, "div", 1),
                  fi(2, "div", 2),
                  fi(3, "h1", 3),
                  Ni(4, "Tech Skills"),
                  pi(),
                  pi(),
                  fi(5, "div", 4),
                  ci(6, Kd, 3, 4, "button", 5),
                  pi(),
                  pi(),
                  pi()),
                  2 & t && (Qr(6), hi("ngForOf", e.skillsInfo.skills));
              },
              directives: [wl, xl],
              styles: [
                "",
                ".btn[_ngcontent-%COMP%], .nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%], .text-header[_ngcontent-%COMP%]{font-family:Voltaire,sans-serif}div[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#293a34}a[_ngcontent-%COMP%]{text-decoration:none;color:#d2d8cc}a[_ngcontent-%COMP%]:hover{color:#293a34}.btn[_ngcontent-%COMP%]{margin:10px;background-color:#293a34;color:#d2d8cc;font-size:30px}.btn[_ngcontent-%COMP%]:hover{background-color:#d2d8cc;color:#293a34;transition:.5s}.btn[_ngcontent-%COMP%]:focus{outline:none;box-shadow:none}.card-title[_ngcontent-%COMP%]{font-weight:600}.nav-link[_ngcontent-%COMP%], .navbar-brand[_ngcontent-%COMP%]{color:#5a6d47;font-size:25px}.navbar-toggler[_ngcontent-%COMP%]{border:none;font-size:2rem}.text-muted[_ngcontent-%COMP%]{color:#667d60!important}.text-header[_ngcontent-%COMP%]{color:#435a4a;margin:20px 0}",
              ],
            })),
            t
          );
        })(),
        Xd = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = zt({ type: t, bootstrap: [Bd] })),
            (t.ɵinj = ct({ providers: [], imports: [[sc, zd]] })),
            t
          );
        })();
      !(function (t, e, n) {
        const r = t.ɵcmp;
        (r.directiveDefs = () => e.map(Lt)), (r.pipeDefs = () => n.map(Vt));
      })(Bd, [qd, Wd, Yd, Qd], [Ol]),
        (function () {
          if (Ma)
            throw new Error("Cannot enable prod mode after platform setup.");
          Ia = !1;
        })(),
        nc()
          .bootstrapModule(Xd)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
