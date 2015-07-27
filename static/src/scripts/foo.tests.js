import {Foo} from './foo';

export function test_foo(test) {
  test.ok(new Foo());
  test.done();
}

export function test_foo_deferred(test) {
  test.expect(1);
  setTimeout(() => {
    test.ok(new Foo());
    test.done();
  }, 1);
}
