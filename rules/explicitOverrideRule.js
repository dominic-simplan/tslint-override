"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.Rule = void 0;
var Lint = require("tslint");
var ts = require("typescript");
function isSomeClassElement(el) {
    return ts.isClassElement(el);
}
var OPTION_DECORATOR = 'decorator';
var OPTION_JSDOC_TAG = 'jsdoc';
var OPTION_EXCLUDE_INTERFACES = 'exclude-interfaces';
var OPTION_FIX_PASCAL_CASE = 'pascal-case-fixer';
var OPTION_NEW_LINE_AFTER_DECORATORS_AND_TAGS = 'new-line-after-decorators-and-tags';
var OPTION_ANGULAR_SYNTAX = 'angular-syntax-fixer';
var MESSAGE_EXTRA_CONSTRUCTOR = 'Extraneous override keyword: constructors always override the parent';
var MESSAGE_EXTRA_STATIC = 'Extraneous override keyword: static members cannot override';
var MESSAGE_EXTRA_NO_OVERRIDE = 'Member with @override keyword does not override any base class member';
var MESSAGE_MISSING_OVERRIDE = 'Member is overriding a base member. Use the @override keyword if this override is intended';
var MESSAGE_EXTRA = 'Extraneous override keyword';
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @override */
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        var hasJsDocParameter = this.ruleArguments.indexOf(OPTION_JSDOC_TAG) !== -1;
        var hasDecoratorParameter = this.ruleArguments.indexOf(OPTION_DECORATOR) !== -1;
        var hasExcludeInterfacesParameter = this.ruleArguments.indexOf(OPTION_EXCLUDE_INTERFACES) !== -1;
        var hasPascalCaseParameter = this.ruleArguments.indexOf(OPTION_FIX_PASCAL_CASE) !== -1;
        var hasNewLineAfterParameter = this.ruleArguments.indexOf(OPTION_NEW_LINE_AFTER_DECORATORS_AND_TAGS) !== -1;
        var hasAngularSyntaxParameter = this.ruleArguments.indexOf(OPTION_ANGULAR_SYNTAX) !== -1;
        return this.applyWithWalker(new Walker(sourceFile, this.ruleName, {
            useDecorator: hasDecoratorParameter || !hasJsDocParameter,
            useJsdocTag: hasJsDocParameter || !hasDecoratorParameter,
            excludeInterfaces: hasExcludeInterfacesParameter,
            usePascalCase: hasPascalCaseParameter,
            newLineAfter: hasNewLineAfterParameter,
            useAngularSyntax: hasAngularSyntaxParameter
        }, program.getTypeChecker()));
    };
    Rule.metadata = {
        ruleName: 'override-jsdoc-tag',
        description: 'Uses the @override JSDoc tag to prevent override mistakes',
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Prevents accidental overriding of a base classe's method,\n            as well as missing base methods for intended overrides.\n        "], ["\n            Prevents accidental overriding of a base classe's method,\n            as well as missing base methods for intended overrides.\n        "]))),
        rationale: 'Catches a class of errors that TypeScript can not catch.',
        optionsDescription: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            The following options can be used and combined. By default, both are enabled.\n\n            * `\"", "\"` Uses a decorator: `@override method() { }`\n            * `\"", "\"` (default) Uses a jsdoc tag: `/** @override */ method() { }`\n            * `\"", "\"` Exclude interfaces from member override checks (default: false)\n            * `\"", "\"` Uses PascalCase `@Override` for the jsdoc tag or decorator in the fixer (default: false)\n            * `\"", "\"` "], ["\n            The following options can be used and combined. By default, both are enabled.\n\n            * \\`\"", "\"\\` Uses a decorator: \\`@override method() { }\\`\n            * \\`\"", "\"\\` (default) Uses a jsdoc tag: \\`/** @override */ method() { }\\`\n            * \\`\"", "\"\\` Exclude interfaces from member override checks (default: false)\n            * \\`\"", "\"\\` Uses PascalCase \\`@Override\\` for the jsdoc tag or decorator in the fixer (default: false)\n            * \\`\"", "\"\\` "])), OPTION_DECORATOR, OPTION_JSDOC_TAG, OPTION_EXCLUDE_INTERFACES, OPTION_FIX_PASCAL_CASE, OPTION_NEW_LINE_AFTER_DECORATORS_AND_TAGS) +
            "Breaks the line after the jsdoc tag or decorator in the fixer (default: false)\n            * `\"".concat(OPTION_ANGULAR_SYNTAX, "\"` Uses Angular Syntax (aka Legacy Decorator Proposal) where the decorator is a function\n        "),
        options: {
            type: 'array',
            items: {
                type: 'string',
                "enum": [
                    OPTION_DECORATOR,
                    OPTION_JSDOC_TAG,
                    OPTION_EXCLUDE_INTERFACES,
                    OPTION_FIX_PASCAL_CASE,
                    OPTION_NEW_LINE_AFTER_DECORATORS_AND_TAGS,
                    OPTION_ANGULAR_SYNTAX
                ]
            },
            minLength: 1,
            maxLength: 5
        },
        optionExamples: [[true, OPTION_DECORATOR]],
        type: 'typescript',
        typescriptOnly: true
    };
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
var OVERRIDE_KEYWORD_CAMEL = 'override';
var OVERRIDE_KEYWORD_PASCAL = 'Override';
var OVERRIDE_DECORATOR_MATCHER = /^@[oO]verride(\(\s*\))?$/;
var Walker = /** @class */ (function (_super) {
    __extends(Walker, _super);
    function Walker(sourceFile, ruleName, _options, checker) {
        var _this = _super.call(this, sourceFile, ruleName, _options) || this;
        _this._options = _options;
        _this.checker = checker;
        return _this;
    }
    /** @override */
    Walker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (isSomeClassElement(node)) {
                _this.checkClassElement(node);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    Walker.prototype.checkClassElement = function (element) {
        switch (element.kind) {
            case ts.SyntaxKind.Constructor:
                this.checkConstructorDeclaration(element);
                break;
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                this.checkOverrideableElementDeclaration(element);
                break;
            default:
                this.checkNonOverrideableElementDeclaration(element);
        }
    };
    Walker.prototype.checkNonOverrideableElementDeclaration = function (node) {
        var foundKeyword = this.checkNodeForOverrideKeyword(node);
        if (foundKeyword !== undefined) {
            this.addFailureAtNode(foundKeyword, MESSAGE_EXTRA, fixRemoveOverrideKeyword(foundKeyword));
        }
    };
    Walker.prototype.checkConstructorDeclaration = function (node) {
        var foundKeyword = this.checkNodeForOverrideKeyword(node);
        if (foundKeyword !== undefined) {
            this.addFailureAtNode(foundKeyword, MESSAGE_EXTRA_CONSTRUCTOR, fixRemoveOverrideKeyword(foundKeyword));
        }
    };
    Walker.prototype.checkOverrideableElementDeclaration = function (node) {
        var foundKeyword = this.checkNodeForOverrideKeyword(node);
        if (isStaticMember(node)) {
            if (foundKeyword !== undefined) {
                this.addFailureAtNode(foundKeyword, MESSAGE_EXTRA_STATIC, fixRemoveOverrideKeyword(foundKeyword));
            }
            return;
        }
        if (!ts.isPropertyDeclaration(node) && node.body === undefined) {
            // Special case if this is just an overload signature
            return;
        }
        var parent = node.parent;
        if (parent == null || !isClassType(parent)) {
            return;
        }
        if (ts.isClassExpression(parent) && !this._options.useJsdocTag) {
            // decorators are not allowed in anonymous class declarations.
            // Skip anonymous class declarations if JSDoc tags are not an option.
            return;
        }
        var base = this.checkHeritageChain(parent, node);
        if (
        // This member declares @override
        foundKeyword !== undefined &&
            // But no base symbol was found
            (base === undefined || base.baseClass === undefined && base.baseInterface === undefined)) {
            // TODO: When given two @override decorators following each other (with a new line or a whitespace between them),
            // the fixer does not break the line
            this.addFailureAtNode(node.name, MESSAGE_EXTRA_NO_OVERRIDE, fixRemoveOverrideKeyword(foundKeyword));
        }
        else if (
        // This member does not declare @override
        foundKeyword === undefined &&
            // And something was found
            base !== undefined &&
            // And that thing is either a base class, or an interface and we are not excluding interface
            (base.baseClass !== undefined || base.baseInterface !== undefined && !this._options.excludeInterfaces)) {
            this.addFailureAtNode(node.name, MESSAGE_MISSING_OVERRIDE, this.fixAddOverrideKeyword(node));
        }
    };
    Walker.prototype.fixAddOverrideKeyword = function (node) {
        return (this._options.useJsdocTag) ?
            this.fixWithJSDocTag(node) :
            this.fixWithDecorator(node);
    };
    Walker.prototype.fixWithDecorator = function (node) {
        if (this._options.newLineAfter) {
            var indent = this.findIndentationOfNode(node);
            return Lint.Replacement.appendText(node.getStart(), "@".concat(this.getKeyword(), "\n") + indent); // tslint:disable-line
        }
        return Lint.Replacement.appendText(node.getStart(), "@".concat(this.getKeyword(), " "));
    };
    Walker.prototype.fixWithJSDocTag = function (node) {
        var jsDoc = node.getChildren().filter(ts.isJSDoc);
        if (jsDoc.length > 0) {
            // Append the @override tag to existing jsDoc
            var lastDoc = jsDoc[jsDoc.length - 1];
            var docText = lastDoc.getText();
            var insertPos = this.findPosToInsertJSDocTag(docText);
            var indent = this.findJSDocIndentationAtPos(docText, insertPos);
            var fix = indent + "@".concat(this.getKeyword(), "\n");
            return Lint.Replacement.appendText(lastDoc.getStart() + insertPos, fix);
        }
        else {
            // No Jsdoc found, create a new one with just the tag
            if (this._options.newLineAfter) {
                var indent = this.findIndentationOfNode(node);
                return Lint.Replacement.appendText(node.getStart(), "/** @".concat(this.getKeyword(), " */\n") + indent);
            }
            return Lint.Replacement.appendText(node.getStart(), "/** @".concat(this.getKeyword(), " */ "));
        }
    };
    Walker.prototype.findIndentationOfNode = function (node) {
        var text = node.getFullText();
        var tokenStart = text.indexOf(node.getText());
        text = text.substr(0, tokenStart);
        var lastNL = text.lastIndexOf('\n');
        return text.substr(lastNL + 1);
    };
    Walker.prototype.findJSDocIndentationAtPos = function (text, pos) {
        var lastNL = text.substr(0, pos - 1).lastIndexOf('\n');
        if (lastNL < 0) {
            // Cannot find indentation with the info available here
            // Just assume it's 4 spaces...
            return '\n    ';
        }
        var acc = '';
        var hasStar = false;
        for (var i = lastNL + 1; i < text.length; i++) {
            var c = text.charAt(i);
            if (!isJSDocIndent(c)) {
                if (hasStar || c !== '*') {
                    break;
                }
                hasStar = true;
            }
            acc += c;
        }
        return acc;
    };
    Walker.prototype.findPosToInsertJSDocTag = function (text) {
        var posOfInsert = text.lastIndexOf('\n');
        if (posOfInsert >= 0) {
            return posOfInsert + 1;
        }
        posOfInsert = text.lastIndexOf('*/');
        if (posOfInsert >= 0) {
            return posOfInsert;
        }
        // This should not happen, but just to be exhaustive
        return text.length - 1;
    };
    Walker.prototype.checkNodeForOverrideKeyword = function (node) {
        var matches = [];
        if (this._options.useJsdocTag) {
            var jsDoc = node.getChildren().filter(ts.isJSDoc);
            var foundTag = this.checkJSDocAndFindOverrideTag(jsDoc);
            if (foundTag != null) {
                matches.push(foundTag);
            }
        }
        if (this._options.useDecorator) {
            var foundDecorator = this.checkNodeAndFindDecorator(node);
            if (foundDecorator) {
                matches.push(foundDecorator);
            }
        }
        return matches[0];
    };
    Walker.prototype.checkNodeAndFindDecorator = function (node) {
        var decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : null;
        if (decorators == null) {
            return;
        }
        var found;
        for (var _i = 0, decorators_1 = decorators; _i < decorators_1.length; _i++) {
            var dec = decorators_1[_i];
            var tmp = this.checkIndividualDecorator(dec, found !== undefined);
            if (found === undefined) {
                found = tmp;
            }
        }
        return found;
    };
    Walker.prototype.checkIndividualDecorator = function (dec, found) {
        if (!OVERRIDE_DECORATOR_MATCHER.test(dec.getText())) {
            return;
        }
        if (found) {
            this.addFailureAtNode(dec, "@override decorator already specified", Lint.Replacement.deleteFromTo(dec.pos, dec.end));
        }
        return dec;
    };
    /**
     * Checks the '@override' tags in the JSDoc and returns it if one was found.
     */
    Walker.prototype.checkJSDocAndFindOverrideTag = function (jsDoc) {
        var found;
        for (var _i = 0, jsDoc_1 = jsDoc; _i < jsDoc_1.length; _i++) {
            var doc = jsDoc_1[_i];
            for (var _a = 0, _b = doc.getChildren(); _a < _b.length; _a++) {
                var c = _b[_a];
                var tmp = this.checkJSDocChild(c, found !== undefined);
                if (found === undefined) {
                    found = tmp;
                }
            }
        }
        return found;
    };
    Walker.prototype.checkJSDocChild = function (child, found) {
        if (!isJSDocTag(child) || child.tagName.text !== OVERRIDE_KEYWORD_CAMEL && child.tagName.text !== OVERRIDE_KEYWORD_PASCAL) {
            return;
        }
        if (found) {
            this.addFailureAtNode(child.tagName, "@override jsdoc tag already specified", Lint.Replacement.deleteFromTo(child.pos, child.end));
        }
        return child;
    };
    Walker.prototype.checkHeritageChain = function (declaration, node) {
        var baseInterface;
        var baseClass;
        var currentDeclaration = declaration;
        if (currentDeclaration === undefined) {
            return;
        }
        var clauses = currentDeclaration.heritageClauses;
        if (clauses === undefined) {
            return;
        }
        for (var _i = 0, clauses_1 = clauses; _i < clauses_1.length; _i++) {
            var clause = clauses_1[_i];
            var isInterface = clause.token === ts.SyntaxKind.ImplementsKeyword;
            for (var _a = 0, _b = clause.types; _a < _b.length; _a++) {
                var typeNode = _b[_a];
                var type = this.checker.getTypeAtLocation(typeNode);
                for (var _c = 0, _d = type.getProperties(); _c < _d.length; _c++) {
                    var symb = _d[_c];
                    if (symb.name === node.name.getText()) {
                        if (isInterface) {
                            baseInterface = type;
                        }
                        else {
                            baseClass = type;
                        }
                    }
                }
            }
        }
        return { baseInterface: baseInterface, baseClass: baseClass };
    };
    Walker.prototype.getKeyword = function () {
        var keyword = this._options.usePascalCase ? OVERRIDE_KEYWORD_PASCAL : OVERRIDE_KEYWORD_CAMEL;
        return this._options.useAngularSyntax ? "".concat(keyword, "()") : "".concat(keyword);
    };
    return Walker;
}(Lint.AbstractWalker));
function fixRemoveOverrideKeyword(keyword) {
    return Lint.Replacement.deleteText(keyword.getStart(), keyword.getWidth());
}
function isStaticMember(node) {
    return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Static) !== 0;
}
function isJSDocTag(t) {
    return t.kind === ts.SyntaxKind.JSDocTag;
}
function isClassType(t) {
    return t !== undefined && (t.kind === ts.SyntaxKind.ClassDeclaration || t.kind === ts.SyntaxKind.ClassExpression);
}
function isJSDocIndent(s) {
    return s === ' ' || s === '\t' || s === '\xa0'; // Last one is nbsp
}
var templateObject_1, templateObject_2;
