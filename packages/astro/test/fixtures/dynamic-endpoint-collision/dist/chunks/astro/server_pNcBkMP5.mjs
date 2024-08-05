import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';

typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();
new TextDecoder();

"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
"-0123456789_".split("").reduce((v, c) => (v[c.charCodeAt(0)] = c, v), []);
