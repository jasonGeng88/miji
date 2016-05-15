/**
 * 修改自  https://github.com/monterail/angular-tagger
 */

(function () {

    angular.module("tagger", []);


    angular.module("tagger").directive("taggerContenteditable", function () {
        return {
            require: "ngModel",
            link: function (scope, elm, attrs, ctrl) {
                var update;
                elm.attr("contenteditable", true);
                ctrl.$render = function () {
                    return elm.text(ctrl.$viewValue);
                };
                update = function ($event) {
                    if ($event.keyCode === 13) {
                        if ($event != null) {
                            if (typeof $event.preventDefault === "function") {
                                $event.preventDefault();
                            }
                        }
                    }
                    return scope.$apply(function () {
                        return ctrl.$setViewValue(elm.text());
                    });
                };
                elm.bind("keyup", update);
                return elm.bind("keydown", update);
            }
        };
    });

    angular.module("tagger").directive("tagger", [
        "$compile", "$timeout", function ($compile, $timeout) {
            return {
                restrict: "AE",
                replace: true,
                template: `
         <span
            class="angular-tagger"
            ng-click="handleOuterClick($event)"
            ng-class="{'angular-tagger--single': config.single}"
            ng-focus="handleOuterFocus($event)">
            <span class="angular-tagger__wrapper" ng-show="tags.length>0">
              <span class="angular-tagger__holder" ng-repeat="tag in tags track by $index">
                <span tagger-contenteditable="true"
                  ng-model="$parent.query"
                  ng-show="pos == $index"
                  ng-keydown="handleKeyDown($event)"
                  ng-keyup="handleKeyUp($event)"
                  ng-click="handleInputClick($event)"
                  ng-blur="handleBlur($index, $event)"
                  class="angular-tagger__input">
                </span>
                <span class="angular-tagger__tag">
                  {{ config.displayFun(tag) }}
                  <span
                    class="angular-tagger-tag__delete"
                    ng-mousedown="handleMousedown()"
                    ng-mouseup="handleMouseup()"
                    ng-click="removeTag($index, $event)">x</span>
                </span>
              </span>
            </span>
            <span tagger-contenteditable="true"
              ng-model="query"
              ng-show="(config.single && !tags.length) || (!config.single && pos == tags.length)"
              ng-keydown="handleKeyDown($event)"
              ng-keyup="handleKeyUp($event)"
              ng-click="handleInputClick($event)"
              placeholder="{{ placeholder }}"
              ng-blur="handleBlur(tags.length, $event)"
              ng-focus="handleFocus($event)"
              class="angular-tagger__input"></span>
            <div class="angular-tagger__hook">
              <ul ng-show="expanded" class="angular-tagger__matching">
                <li class="angular-tagger__matching-item"
                  ng-mousedown="handleMousedown()"
                  ng-mouseup="handleMouseup()"
                  ng-mouseover="selectItem(-1)"
                  ng-click="handleItemClick($event)"
                  ng-hide="config.disableNew || !query.trim().length || hideNew"
                  ng-class='{"angular-tagger__matching-item--selected": selected == -1}'>
                  Add: {{ query }}...
                </li>
                <li
                  ng-repeat="e in matching"
                  ng-mousedown="handleMousedown()"
                  ng-mouseup="handleMouseup()"
                  ng-mouseover="selectItem($index)"
                  ng-click="handleItemClick($event)"
                  class="angular-tagger__matching-item"
                  ng-class='{"angular-tagger__matching-item--selected": $index == selected}'>
                  {{ config.displayFun(e) }}
                </li>
              </ul>
            </div>
          </span>


        `,
                scope: {
                    value: "=ngModel",
                    options: "="
                },
                link: function ($scope, element, attrs) {
                    var input, mousedown, _currentInput, _overLimit, _updateFocus, _updateMatching;
                    $scope.query = "";
                    $scope.expanded = false;
                    $scope.matching = [];
                    $scope.selected = 0;
                    $scope.options = $scope.options || [];
                    $scope.tags = $scope.tags || [];
                    $scope.placeholder = null;
                    $scope.hideNew = false;
                    $scope.config = {
                        disableNew: (attrs.disableNew != null),
                        displayFun: (function (e) {
                            return e;
                        }),
                        createFun: (function (e) {
                            return e;
                        }),
                        limit: (attrs.limit != null) ? parseInt(attrs.limit) : null,
                        placeholder: attrs.placeholder || null
                    };


                    if (attrs.displayFun != null) {
                        $scope.config.displayFun = $scope.$parent.$eval(attrs.displayFun);
                    }
                    if (attrs.createFun != null) {
                        $scope.config.createFun = $scope.$parent.$eval(attrs.createFun);
                    }
                    if (attrs.onSelect != null) {
                        $scope.config.onSelect = $scope.$parent.$eval(attrs.onSelect);
                    }
                    $scope.placeholder = $scope.config.placeholder;


                    if (attrs.single != null) {
                        $scope.config.single = true;
                        $scope.config.limit = 1;
                    }

                    if ($scope.config.disableNew) {
                        $scope.selected = 0;
                    }
                    var _updatePlaceholder = ()=> {
                        $scope.placeholder = $scope.tags.length > 0 ? null : $scope.config.placeholder;

                    }
                    input = element.children().eq(1);

                    _updateMatching = function () {
                        return $timeout(function () {
                            var found, opt, rx, str, t, _j, _k, _len1, _len2, _ref1, _ref2;
                            rx = new RegExp(".*" + ($scope.query.trim().split("").join(".*")) + ".*", "i");
                            $scope.hideNew = false;
                            $scope.matching = [];
                            _ref1 = $scope.options;
                            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                                opt = _ref1[_j];
                                str = $scope.config.displayFun(opt);
                                if (rx.test(str)) {
                                    if (str.toLowerCase() === $scope.query.trim().toLowerCase()) {
                                        $scope.hideNew = true;
                                    }
                                    found = false;
                                    _ref2 = $scope.tags;
                                    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                                        t = _ref2[_k];
                                        if (t === opt) {
                                            found = true;
                                        }
                                    }
                                    if (!found) {
                                        $scope.matching.push(opt);
                                    }
                                }
                            }
                            $scope.selected = $scope.config.disableNew ? 0 : $scope.matching.length > 0 ? 0 : -1;
                            _updatePlaceholder();
                        });
                    };


                    _updateFocus = function () {
                        return $timeout(function () {
                            _currentInput().focus();
                            return $scope.show();
                        });
                    };
                    _currentInput = function () {
                        if ($scope.pos === $scope.tags.length) {
                            return input[0];
                        } else {
                            return element.children().eq(0).children().eq($scope.pos).children()[0];
                        }
                    };
                    _overLimit = function () {
                        return $scope.config.limit && $scope.tags.length >= $scope.config.limit;
                    };


                   let  _itemExist=(item)=>{

                        let exist = false;
                        for(let i=0;i<$scope.tags.length;i++){
                            let curItem = $scope.tags[i];
                            if(angular.equals(item,curItem)){

                                exist = true;
                                break;
                            }
                        }

                        return exist;

                    }




                    $scope.handleOuterClick = function ($event) {
                        if ($event != null) {
                            if (typeof $event.stopPropagation === "function") {
                                $event.stopPropagation();
                            }
                        }
                        if ($scope.config.single) {
                            $scope.removeTag(0);
                            _updateMatching();
                        }
                        return _updateFocus();
                    };
                    mousedown = false;
                    $scope.handleMousedown = function () {
                        return mousedown = true;
                    };
                    $scope.handleMouseup = function () {
                        return mousedown = false;
                    };
                    $scope.handleKeyUp = function ($event) {
                        var _ref1;
                        switch ($event.keyCode) {
                            case 8://Backspace
                                _updateMatching();
                                break;
                            case 46://Delete
                                _updateMatching();
                                break;
                            case 27://Escape
                                $scope.hide();
                                break;
                            default:
                                if ((48 < (_ref1 = $event.keyCode) && _ref1 < 90)) {
                                    _updateMatching();
                                    $scope.show();
                                }
                        }
                    };
                    $scope.handleKeyDown = function ($event) {
                        switch ($event.keyCode) {
                            case 38://Up
                                $scope.selected = Math.max($scope.selected - 1, $scope.config.disableNew ? 0 : -1);
                                $event.preventDefault();
                                break;
                            case 40://Down
                                $scope.selected = Math.min($scope.selected + 1, $scope.matching.length - 1);
                                $event.preventDefault();
                                break;
                            case 13://Enter
                                return $scope.addItem();
                            case 8://Backspace
                                if ($scope.query.trim() === "" && $scope.pos > 0) {
                                    $scope.removeTag($scope.pos - 1);

                                }
                                break;
                            case 46://Delete
                                if ($scope.query.trim() === "" && $scope.pos < $scope.tags.length) {
                                    $scope.removeTag($scope.pos);

                                }
                                break;
                            case 37://Left
                                if ($scope.query.trim() === "") {
                                    $scope.pos = Math.max($scope.pos - 1, 0);
                                    _updateFocus();
                                }
                                break;
                            case 39://Right
                                if ($scope.query.trim() === "") {
                                    $scope.pos = Math.min($scope.pos + 1, $scope.tags.length);
                                    _updateFocus();
                                }
                                break;
                        }
                    };
                    $scope.handleInputClick = function ($event) {
                        return $event.stopPropagation();
                    };
                    $scope.handleItemClick = function ($event) {
                        $scope.addItem();
                        return $event.stopPropagation();
                    };
                    $scope.handleOuterFocus = function ($event) {
                        var _ref1;
                        return (_ref1 = _currentInput()) != null ? typeof _ref1.focus === "function" ? _ref1.focus() : void 0 : void 0;
                    };
                    $scope.handleBlur = function ($index, $event) {
                        if ($index === $scope.pos && !mousedown) {
                            return $scope.hide();
                        }
                    };
                    $scope.handleFocus = function ($event) {
                        return $scope.show();
                    };
                    $scope.addItem = function () {
                        var item;
                        if (_overLimit()) {
                            return;
                        }



                        if ($scope.config.disableNew){

                            item = ( $scope.selected > -1) ? $scope.matching[$scope.selected] : null

                        }else if ($scope.selected == -1 && $scope.query.trim()){
                            let query = $scope.query.trim();
                            item = $scope.config.createFun(query);
                        }else if ($scope.selected > -1){
                            item =   $scope.matching[$scope.selected]
                        }






                        if(_itemExist(item)){

                            $scope.$emit("TAG_EXIST_ADD",{})

                            return;
                        }



                        if (item) {
                            console.log("adding ", item);
                            $scope.tags.splice($scope.pos, 0, item);
                            $scope.query = "";
                            _updateMatching();
                            $scope.selected = Math.min($scope.selected, $scope.matching.length - 1);
                            $scope.pos++;
                            _updateFocus();
                            if ($scope.config.single) {
                                $scope.value = $scope.tags[0];
                            }else{
                                $scope.value = $scope.tags;
                            }
                            $timeout(function () {
                                var _base = $scope.config;
                                typeof _base.onSelect === "function" ? _base.onSelect(item) : void 0;
                            });
                            if (_overLimit()) {
                                $scope.hide();
                            }
                        }
                    };
                    $scope.selectItem = function (index) {
                         $scope.selected = index;
                    };
                    $scope.show = function () {
                         $scope.expanded = !_overLimit();
                         if($scope.matching.length==0){
                            $scope.expanded = false;
                         }
                    };
                    $scope.hide = function () {
                        $scope.expanded = false;
                        $scope.query = "";
                        $scope.pos = $scope.tags.length;
                        $timeout(function () {
                            var _ref1;
                            return (_ref1 = _currentInput()) != null ? typeof _ref1.blur === "function" ? _ref1.blur() : void 0 : void 0;
                        });
                    };
                    $scope.removeTag = function (pos, $event) {
                        if ($event != null) {
                            if (typeof $event.stopPropagation === "function") {
                                $event.stopPropagation();
                            }
                        }
                        $scope.tags.splice(pos, 1);
                        if ($scope.config.single) {
                            $scope.value = $scope.tags[0];
                        }
                        if (pos < $scope.pos) {
                            $scope.pos--;
                        }
                        if ($scope.expanded) {
                            _updateMatching();
                            _updateFocus();
                        }
                        if ($scope.config.single) {
                            return $scope.value = $scope.tags[0];
                        }
                        _updatePlaceholder();
                    };
                    _updateMatching();
                    $scope.$watch("options", _updateMatching, true);
                    $scope.$watch("value", function () {
                        if ($scope.config.single) {
                            $scope.tags = ($scope.value != null) ? [$scope.value] : [];
                        } else {
                            $scope.tags = $scope.value || [];
                        }
                        $scope.pos = $scope.tags.length;

                            _updateMatching();



                    }, true);
                }
            };
        }
    ]);

}).call(this);
