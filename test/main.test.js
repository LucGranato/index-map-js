'use strict';

const assert = require('assert');
const indexMap = require('../index');

describe('index-map library', () => {
    describe('default use case', () => {
        it('should proxy dictionary without changing the instance class/type', () => {
            const MyClass = function() {
                this.__path = 'a';
                this.A_FIELD = {
                    SUB_FIELD: 'b',
                };
                return this;
            };
            const myClass = new MyClass();
            const myProxy = indexMap(myClass);
            assert.ok(myProxy instanceof MyClass);
        });
        it('should have default options', () => {
            const dictionary = indexMap({
                SUB: {
                    __path: 'sub',
                    SUB2: {
                        PROP: 'prop',
                        INT_VALUE: 10,
                    },
                },
            });
            assert.equal(dictionary.SUB.SUB2.PROP, 'sub/prop');
            assert.equal(dictionary.SUB.SUB2.INT_VALUE, 10);
        });
    });
    describe('url use case', () => {
        it('should change path property reference', () => {
            const mySite = indexMap(
                {
                    url: 'http://example.com',
                    BLOG: {
                        url: 'blog',
                        ARTICLE: {
                            url: 'article',
                            ARTICLE_1: '1',
                        },
                    },
                },
                {
                    path: 'url',
                },
            );
            assert.equal(mySite.BLOG.ARTICLE.ARTICLE_1, 'http://example.com/blog/article/1');
        });
    });
    describe('permission use case', () => {
        it('should change separator option', () => {
            const myACL = indexMap(
                {
                    level: 'root',
                    BLOG: {
                        ARTICLE: {
                            CREATE: 'create',
                        },
                    },
                },
                {
                    separator: ':',
                    path: 'level',
                },
            );
            assert.equal(myACL.BLOG.ARTICLE.CREATE, 'root:create');
        });
    });
});
