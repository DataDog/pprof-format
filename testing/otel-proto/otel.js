/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
var $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $Array = $util.global.Array, $TypeError = $util.global.TypeError, $Number = $util.global.Number, $parseInt = $util.global.parseInt, $String = $util.global.String, $BigInt = $util.global.BigInt, $Boolean = $util.global.Boolean, $isFinite = $util.global.isFinite;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.opentelemetry = (function() {

    /**
     * Namespace opentelemetry.
     * @exports opentelemetry
     * @namespace
     */
    var opentelemetry = {};

    opentelemetry.proto = (function() {

        /**
         * Namespace proto.
         * @memberof opentelemetry
         * @namespace
         */
        var proto = {};

        proto.collector = (function() {

            /**
             * Namespace collector.
             * @memberof opentelemetry.proto
             * @namespace
             */
            var collector = {};

            collector.profiles = (function() {

                /**
                 * Namespace profiles.
                 * @memberof opentelemetry.proto.collector
                 * @namespace
                 */
                var profiles = {};

                profiles.v1development = (function() {

                    /**
                     * Namespace v1development.
                     * @memberof opentelemetry.proto.collector.profiles
                     * @namespace
                     */
                    var v1development = {};

                    v1development.ProfilesService = (function() {

                        /**
                         * Constructs a new ProfilesService service.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @classdesc Represents a ProfilesService
                         * @extends $protobuf.rpc.Service
                         * @constructor
                         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                         */
                        var ProfilesService = function(rpcImpl, requestDelimited, responseDelimited) {
                            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                        };

                        $Object.defineProperty(ProfilesService.prototype = $Object.create($protobuf.rpc.Service.prototype), "constructor", { value: ProfilesService, writable: true, enumerable: false, configurable: true });

                        /**
                         * Creates new ProfilesService service using the specified rpc implementation.
                         * @function create
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ProfilesService
                         * @static
                         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                         * @returns {ProfilesService} RPC service. Useful where requests and/or responses are streamed.
                         */
                        ProfilesService.create = function(rpcImpl, requestDelimited, responseDelimited) {
                            return new this(rpcImpl, requestDelimited, responseDelimited);
                        };

                        /**
                         * Callback as used by {@link opentelemetry.proto.collector.profiles.v1development.ProfilesService#export_}.
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ProfilesService
                         * @typedef ExportCallback
                         * @type {function}
                         * @param {Error|null} error Error, if any
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse} [response] ExportProfilesServiceResponse
                         */

                        /**
                         * Calls Export.
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ProfilesService
                         * @typedef Export
                         * @type {{
                         *   (request: opentelemetry.proto.collector.profiles.v1development.IExportProfilesServiceRequest, callback: opentelemetry.proto.collector.profiles.v1development.ProfilesService.ExportCallback): void;
                         *   (request: opentelemetry.proto.collector.profiles.v1development.IExportProfilesServiceRequest): Promise<opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse>;
                         *   readonly name: "Export";
                         *   readonly path: "/opentelemetry.proto.collector.profiles.v1development.ProfilesService/Export";
                         *   readonly requestType: "ExportProfilesServiceRequest";
                         *   readonly responseType: "ExportProfilesServiceResponse";
                         *   readonly requestStream: undefined;
                         *   readonly responseStream: undefined;
                         * }}
                         */

                        /**
                         * Calls Export.
                         * @name opentelemetry.proto.collector.profiles.v1development.ProfilesService#export
                         * @type {opentelemetry.proto.collector.profiles.v1development.ProfilesService.Export}
                         */
                        $Object.defineProperties(ProfilesService.prototype["export"] = function(request, callback) {
                            return $protobuf.rpc.Service.prototype.rpcCall.call(this, ProfilesService.prototype["export"], $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest, $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse, request, callback);
                        }, {
                            name: { value: "Export" },
                            path: { value: "/opentelemetry.proto.collector.profiles.v1development.ProfilesService/Export" },
                            requestType: { value: "ExportProfilesServiceRequest" },
                            responseType: { value: "ExportProfilesServiceResponse" },
                            requestStream: { value: $undefined },
                            responseStream: { value: $undefined }
                        });

                        return ProfilesService;
                    })();

                    v1development.ExportProfilesServiceRequest = (function() {

                        /**
                         * Properties of an ExportProfilesServiceRequest.
                         * @typedef {Object} opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties
                         * @property {Array.<opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties>|null} [resourceProfiles] ExportProfilesServiceRequest resourceProfiles
                         * @property {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null} [dictionary] ExportProfilesServiceRequest dictionary
                         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                         */

                        /**
                         * Properties of an ExportProfilesServiceRequest.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @interface IExportProfilesServiceRequest
                         * @augments opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties
                         * @deprecated Use opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties instead.
                         */

                        /**
                         * Shape of an ExportProfilesServiceRequest.
                         * @typedef {{
                         *   resourceProfiles?: Array.<opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape>|null;
                         *   dictionary?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape|null;
                         *   $unknowns?: Array.<Uint8Array>;
                         * }} opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape
                         */

                        /**
                         * Constructs a new ExportProfilesServiceRequest.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @classdesc Represents an ExportProfilesServiceRequest.
                         * @constructor
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties=} [properties] Properties to set
                         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                         */
                        var ExportProfilesServiceRequest = function (properties) {
                            this.resourceProfiles = [];
                            if (properties)
                                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                        this[keys[i]] = properties[keys[i]];
                        };

                        /**
                         * ExportProfilesServiceRequest resourceProfiles.
                         * @member {Array.<opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties>} resourceProfiles
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @instance
                         */
                        ExportProfilesServiceRequest.prototype.resourceProfiles = $util.emptyArray;

                        /**
                         * ExportProfilesServiceRequest dictionary.
                         * @member {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null|undefined} dictionary
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @instance
                         */
                        ExportProfilesServiceRequest.prototype.dictionary = null;

                        /**
                         * Creates a new ExportProfilesServiceRequest instance using the specified properties.
                         * @function create
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties=} [properties] Properties to set
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest} ExportProfilesServiceRequest instance
                         * @type {{
                         *   (properties: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape;
                         *   (properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest;
                         * }}
                         */
                        ExportProfilesServiceRequest.create = function(properties) {
                            return new ExportProfilesServiceRequest(properties);
                        };

                        /**
                         * Encodes the specified ExportProfilesServiceRequest message. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.verify|verify} messages.
                         * @function encode
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties} message ExportProfilesServiceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ExportProfilesServiceRequest.encode = function (message, writer, _depth) {
                            if (!writer)
                                writer = $Writer.create();
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            if (message.resourceProfiles != null && message.resourceProfiles.length)
                                for (var i = 0; i < message.resourceProfiles.length; ++i)
                                    $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.encode(message.resourceProfiles[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                            if (message.dictionary != null && $Object.hasOwnProperty.call(message, "dictionary"))
                                $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.encode(message.dictionary, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                                for (var i = 0; i < message.$unknowns.length; ++i)
                                    writer.raw(message.$unknowns[i]);
                            return writer;
                        };

                        /**
                         * Encodes the specified ExportProfilesServiceRequest message, length delimited. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties} message ExportProfilesServiceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ExportProfilesServiceRequest.encodeDelimited = function(message, writer) {
                            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                        };

                        /**
                         * Decodes an ExportProfilesServiceRequest message from the specified reader or buffer.
                         * @function decode
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape} ExportProfilesServiceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ExportProfilesServiceRequest.decode = function (reader, length, _end, _depth, _target) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $Reader.recursionLimit)
                                throw $Error("max depth exceeded");
                            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest(), value;
                            while (reader.pos < end) {
                                var start = reader.pos;
                                var tag = reader.tag();
                                if (tag === _end) {
                                    _end = $undefined;
                                    break;
                                }
                                var wireType = tag & 7;
                                switch (tag >>>= 3) {
                                case 1: {
                                        if (wireType !== 2)
                                            break;
                                        if (!(message.resourceProfiles && message.resourceProfiles.length))
                                            message.resourceProfiles = [];
                                        message.resourceProfiles.push($root.opentelemetry.proto.profiles.v1development.ResourceProfiles.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                        continue;
                                    }
                                case 2: {
                                        if (wireType !== 2)
                                            break;
                                        message.dictionary = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.decode(reader, reader.uint32(), $undefined, _depth + 1, message.dictionary);
                                        continue;
                                    }
                                }
                                reader.skipType(wireType, _depth, tag);
                                if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                            }
                            if (_end !== $undefined)
                                throw $Error("missing end group");
                            return message;
                        };

                        /**
                         * Decodes an ExportProfilesServiceRequest message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape} ExportProfilesServiceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ExportProfilesServiceRequest.decodeDelimited = function(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an ExportProfilesServiceRequest message.
                         * @function verify
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ExportProfilesServiceRequest.verify = function (message, _depth) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                return "max depth exceeded";
                            if (message.resourceProfiles != null && $Object.hasOwnProperty.call(message, "resourceProfiles")) {
                                if (!$Array.isArray(message.resourceProfiles))
                                    return "resourceProfiles: array expected";
                                for (var i = 0; i < message.resourceProfiles.length; ++i) {
                                    var error = $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.verify(message.resourceProfiles[i], _depth + 1);
                                    if (error)
                                        return "resourceProfiles." + error;
                                }
                            }
                            if (message.dictionary != null && $Object.hasOwnProperty.call(message, "dictionary")) {
                                var error = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.verify(message.dictionary, _depth + 1);
                                if (error)
                                    return "dictionary." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates an ExportProfilesServiceRequest message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest} ExportProfilesServiceRequest
                         */
                        ExportProfilesServiceRequest.fromObject = function (object, _depth) {
                            if (object instanceof $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest)
                                return object;
                            if (!$util.isObject(object))
                                throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest: object expected");
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            var message = new $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest();
                            if (object.resourceProfiles) {
                                if (!$Array.isArray(object.resourceProfiles))
                                    throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.resourceProfiles: array expected");
                                message.resourceProfiles = $Array(object.resourceProfiles.length);
                                for (var i = 0; i < object.resourceProfiles.length; ++i) {
                                    if (!$util.isObject(object.resourceProfiles[i]))
                                        throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.resourceProfiles: object expected");
                                    message.resourceProfiles[i] = $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.fromObject(object.resourceProfiles[i], _depth + 1);
                                }
                            }
                            if (object.dictionary != null) {
                                if (!$util.isObject(object.dictionary))
                                    throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.dictionary: object expected");
                                message.dictionary = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.fromObject(object.dictionary, _depth + 1);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from an ExportProfilesServiceRequest message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest} message ExportProfilesServiceRequest
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ExportProfilesServiceRequest.toObject = function (message, options, _depth) {
                            if (!options)
                                options = {};
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            var object = {};
                            if (options.arrays || options.defaults)
                                object.resourceProfiles = [];
                            if (options.defaults)
                                object.dictionary = null;
                            if (message.resourceProfiles && message.resourceProfiles.length) {
                                object.resourceProfiles = $Array(message.resourceProfiles.length);
                                for (var j = 0; j < message.resourceProfiles.length; ++j)
                                    object.resourceProfiles[j] = $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.toObject(message.resourceProfiles[j], options, _depth + 1);
                            }
                            if (message.dictionary != null && $Object.hasOwnProperty.call(message, "dictionary"))
                                object.dictionary = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.toObject(message.dictionary, options, _depth + 1);
                            return object;
                        };

                        /**
                         * Converts this ExportProfilesServiceRequest to JSON.
                         * @function toJSON
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ExportProfilesServiceRequest.prototype.toJSON = function() {
                            return ExportProfilesServiceRequest.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the type url for ExportProfilesServiceRequest
                         * @function getTypeUrl
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest
                         * @static
                         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                         * @returns {string} The type url
                         */
                        ExportProfilesServiceRequest.getTypeUrl = function(prefix) {
                            if (prefix === $undefined)
                                prefix = "type.googleapis.com";
                            return prefix + "/opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest";
                        };

                        return ExportProfilesServiceRequest;
                    })();

                    v1development.ExportProfilesServiceResponse = (function() {

                        /**
                         * Properties of an ExportProfilesServiceResponse.
                         * @typedef {Object} opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties
                         * @property {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties|null} [partialSuccess] ExportProfilesServiceResponse partialSuccess
                         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                         */

                        /**
                         * Properties of an ExportProfilesServiceResponse.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @interface IExportProfilesServiceResponse
                         * @augments opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties
                         * @deprecated Use opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties instead.
                         */

                        /**
                         * Shape of an ExportProfilesServiceResponse.
                         * @typedef {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties} opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape
                         */

                        /**
                         * Constructs a new ExportProfilesServiceResponse.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @classdesc Represents an ExportProfilesServiceResponse.
                         * @constructor
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties=} [properties] Properties to set
                         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                         */
                        var ExportProfilesServiceResponse = function (properties) {
                            if (properties)
                                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                        this[keys[i]] = properties[keys[i]];
                        };

                        /**
                         * ExportProfilesServiceResponse partialSuccess.
                         * @member {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties|null|undefined} partialSuccess
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @instance
                         */
                        ExportProfilesServiceResponse.prototype.partialSuccess = null;

                        /**
                         * Creates a new ExportProfilesServiceResponse instance using the specified properties.
                         * @function create
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties=} [properties] Properties to set
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse} ExportProfilesServiceResponse instance
                         * @type {{
                         *   (properties: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape;
                         *   (properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse;
                         * }}
                         */
                        ExportProfilesServiceResponse.create = function(properties) {
                            return new ExportProfilesServiceResponse(properties);
                        };

                        /**
                         * Encodes the specified ExportProfilesServiceResponse message. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.verify|verify} messages.
                         * @function encode
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties} message ExportProfilesServiceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ExportProfilesServiceResponse.encode = function (message, writer, _depth) {
                            if (!writer)
                                writer = $Writer.create();
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            if (message.partialSuccess != null && $Object.hasOwnProperty.call(message, "partialSuccess"))
                                $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.encode(message.partialSuccess, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                                for (var i = 0; i < message.$unknowns.length; ++i)
                                    writer.raw(message.$unknowns[i]);
                            return writer;
                        };

                        /**
                         * Encodes the specified ExportProfilesServiceResponse message, length delimited. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties} message ExportProfilesServiceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ExportProfilesServiceResponse.encodeDelimited = function(message, writer) {
                            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                        };

                        /**
                         * Decodes an ExportProfilesServiceResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape} ExportProfilesServiceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ExportProfilesServiceResponse.decode = function (reader, length, _end, _depth, _target) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $Reader.recursionLimit)
                                throw $Error("max depth exceeded");
                            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse(), value;
                            while (reader.pos < end) {
                                var start = reader.pos;
                                var tag = reader.tag();
                                if (tag === _end) {
                                    _end = $undefined;
                                    break;
                                }
                                var wireType = tag & 7;
                                switch (tag >>>= 3) {
                                case 1: {
                                        if (wireType !== 2)
                                            break;
                                        message.partialSuccess = $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.decode(reader, reader.uint32(), $undefined, _depth + 1, message.partialSuccess);
                                        continue;
                                    }
                                }
                                reader.skipType(wireType, _depth, tag);
                                if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                            }
                            if (_end !== $undefined)
                                throw $Error("missing end group");
                            return message;
                        };

                        /**
                         * Decodes an ExportProfilesServiceResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape} ExportProfilesServiceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ExportProfilesServiceResponse.decodeDelimited = function(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an ExportProfilesServiceResponse message.
                         * @function verify
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ExportProfilesServiceResponse.verify = function (message, _depth) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                return "max depth exceeded";
                            if (message.partialSuccess != null && $Object.hasOwnProperty.call(message, "partialSuccess")) {
                                var error = $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.verify(message.partialSuccess, _depth + 1);
                                if (error)
                                    return "partialSuccess." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates an ExportProfilesServiceResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse} ExportProfilesServiceResponse
                         */
                        ExportProfilesServiceResponse.fromObject = function (object, _depth) {
                            if (object instanceof $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse)
                                return object;
                            if (!$util.isObject(object))
                                throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse: object expected");
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            var message = new $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse();
                            if (object.partialSuccess != null) {
                                if (!$util.isObject(object.partialSuccess))
                                    throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.partialSuccess: object expected");
                                message.partialSuccess = $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.fromObject(object.partialSuccess, _depth + 1);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from an ExportProfilesServiceResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse} message ExportProfilesServiceResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ExportProfilesServiceResponse.toObject = function (message, options, _depth) {
                            if (!options)
                                options = {};
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            var object = {};
                            if (options.defaults)
                                object.partialSuccess = null;
                            if (message.partialSuccess != null && $Object.hasOwnProperty.call(message, "partialSuccess"))
                                object.partialSuccess = $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.toObject(message.partialSuccess, options, _depth + 1);
                            return object;
                        };

                        /**
                         * Converts this ExportProfilesServiceResponse to JSON.
                         * @function toJSON
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ExportProfilesServiceResponse.prototype.toJSON = function() {
                            return ExportProfilesServiceResponse.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the type url for ExportProfilesServiceResponse
                         * @function getTypeUrl
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse
                         * @static
                         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                         * @returns {string} The type url
                         */
                        ExportProfilesServiceResponse.getTypeUrl = function(prefix) {
                            if (prefix === $undefined)
                                prefix = "type.googleapis.com";
                            return prefix + "/opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse";
                        };

                        return ExportProfilesServiceResponse;
                    })();

                    v1development.ExportProfilesPartialSuccess = (function() {

                        /**
                         * Properties of an ExportProfilesPartialSuccess.
                         * @typedef {Object} opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties
                         * @property {number|Long|null} [rejectedProfiles] ExportProfilesPartialSuccess rejectedProfiles
                         * @property {string|null} [errorMessage] ExportProfilesPartialSuccess errorMessage
                         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                         */

                        /**
                         * Properties of an ExportProfilesPartialSuccess.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @interface IExportProfilesPartialSuccess
                         * @augments opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties
                         * @deprecated Use opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties instead.
                         */

                        /**
                         * Shape of an ExportProfilesPartialSuccess.
                         * @typedef {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties} opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape
                         */

                        /**
                         * Constructs a new ExportProfilesPartialSuccess.
                         * @memberof opentelemetry.proto.collector.profiles.v1development
                         * @classdesc Represents an ExportProfilesPartialSuccess.
                         * @constructor
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties=} [properties] Properties to set
                         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                         */
                        var ExportProfilesPartialSuccess = function (properties) {
                            if (properties)
                                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                        this[keys[i]] = properties[keys[i]];
                        };

                        /**
                         * ExportProfilesPartialSuccess rejectedProfiles.
                         * @member {number|Long} rejectedProfiles
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @instance
                         */
                        ExportProfilesPartialSuccess.prototype.rejectedProfiles = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * ExportProfilesPartialSuccess errorMessage.
                         * @member {string} errorMessage
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @instance
                         */
                        ExportProfilesPartialSuccess.prototype.errorMessage = "";

                        /**
                         * Creates a new ExportProfilesPartialSuccess instance using the specified properties.
                         * @function create
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties=} [properties] Properties to set
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess} ExportProfilesPartialSuccess instance
                         * @type {{
                         *   (properties: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape;
                         *   (properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess;
                         * }}
                         */
                        ExportProfilesPartialSuccess.create = function(properties) {
                            return new ExportProfilesPartialSuccess(properties);
                        };

                        /**
                         * Encodes the specified ExportProfilesPartialSuccess message. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.verify|verify} messages.
                         * @function encode
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties} message ExportProfilesPartialSuccess message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ExportProfilesPartialSuccess.encode = function (message, writer, _depth) {
                            if (!writer)
                                writer = $Writer.create();
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            if (message.rejectedProfiles != null && $Object.hasOwnProperty.call(message, "rejectedProfiles") && (typeof message.rejectedProfiles === "object" ? message.rejectedProfiles.low || message.rejectedProfiles.high : message.rejectedProfiles !== 0))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.rejectedProfiles);
                            if (message.errorMessage != null && $Object.hasOwnProperty.call(message, "errorMessage") && message.errorMessage !== "")
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.errorMessage);
                            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                                for (var i = 0; i < message.$unknowns.length; ++i)
                                    writer.raw(message.$unknowns[i]);
                            return writer;
                        };

                        /**
                         * Encodes the specified ExportProfilesPartialSuccess message, length delimited. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties} message ExportProfilesPartialSuccess message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ExportProfilesPartialSuccess.encodeDelimited = function(message, writer) {
                            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                        };

                        /**
                         * Decodes an ExportProfilesPartialSuccess message from the specified reader or buffer.
                         * @function decode
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape} ExportProfilesPartialSuccess
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ExportProfilesPartialSuccess.decode = function (reader, length, _end, _depth, _target) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $Reader.recursionLimit)
                                throw $Error("max depth exceeded");
                            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess(), value;
                            while (reader.pos < end) {
                                var start = reader.pos;
                                var tag = reader.tag();
                                if (tag === _end) {
                                    _end = $undefined;
                                    break;
                                }
                                var wireType = tag & 7;
                                switch (tag >>>= 3) {
                                case 1: {
                                        if (wireType !== 0)
                                            break;
                                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                            message.rejectedProfiles = value;
                                        else
                                            delete message.rejectedProfiles;
                                        continue;
                                    }
                                case 2: {
                                        if (wireType !== 2)
                                            break;
                                        if ((value = reader.stringVerify()).length)
                                            message.errorMessage = value;
                                        else
                                            delete message.errorMessage;
                                        continue;
                                    }
                                }
                                reader.skipType(wireType, _depth, tag);
                                if (!reader.discardUnknown) {
                                    $util.makeProp(message, "$unknowns", false);
                                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                                }
                            }
                            if (_end !== $undefined)
                                throw $Error("missing end group");
                            return message;
                        };

                        /**
                         * Decodes an ExportProfilesPartialSuccess message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape} ExportProfilesPartialSuccess
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ExportProfilesPartialSuccess.decodeDelimited = function(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an ExportProfilesPartialSuccess message.
                         * @function verify
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ExportProfilesPartialSuccess.verify = function (message, _depth) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                return "max depth exceeded";
                            if (message.rejectedProfiles != null && $Object.hasOwnProperty.call(message, "rejectedProfiles"))
                                if (!$util.isInteger(message.rejectedProfiles) && !(message.rejectedProfiles && $util.isInteger(message.rejectedProfiles.low) && $util.isInteger(message.rejectedProfiles.high)))
                                    return "rejectedProfiles: integer|Long expected";
                            if (message.errorMessage != null && $Object.hasOwnProperty.call(message, "errorMessage"))
                                if (!$util.isString(message.errorMessage))
                                    return "errorMessage: string expected";
                            return null;
                        };

                        /**
                         * Creates an ExportProfilesPartialSuccess message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess} ExportProfilesPartialSuccess
                         */
                        ExportProfilesPartialSuccess.fromObject = function (object, _depth) {
                            if (object instanceof $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess)
                                return object;
                            if (!$util.isObject(object))
                                throw $TypeError(".opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess: object expected");
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            var message = new $root.opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess();
                            if (object.rejectedProfiles != null)
                                if (typeof object.rejectedProfiles === "object" ? object.rejectedProfiles.low || object.rejectedProfiles.high : $Number(object.rejectedProfiles) !== 0)
                                    if ($util.Long)
                                        message.rejectedProfiles = $util.Long.fromValue(object.rejectedProfiles, false);
                                    else if (typeof object.rejectedProfiles === "string")
                                        message.rejectedProfiles = $parseInt(object.rejectedProfiles, 10);
                                    else if (typeof object.rejectedProfiles === "number")
                                        message.rejectedProfiles = object.rejectedProfiles;
                                    else if (typeof object.rejectedProfiles === "object")
                                        message.rejectedProfiles = new $util.LongBits(object.rejectedProfiles.low >>> 0, object.rejectedProfiles.high >>> 0).toNumber();
                            if (object.errorMessage != null)
                                if (typeof object.errorMessage !== "string" || object.errorMessage.length)
                                    message.errorMessage = $String(object.errorMessage);
                            return message;
                        };

                        /**
                         * Creates a plain object from an ExportProfilesPartialSuccess message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess} message ExportProfilesPartialSuccess
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ExportProfilesPartialSuccess.toObject = function (message, options, _depth) {
                            if (!options)
                                options = {};
                            if (_depth === $undefined)
                                _depth = 0;
                            if (_depth > $util.recursionLimit)
                                throw $Error("max depth exceeded");
                            var object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    var long = new $util.Long(0, 0, false);
                                    object.rejectedProfiles = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                                } else
                                    object.rejectedProfiles = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                                object.errorMessage = "";
                            }
                            if (message.rejectedProfiles != null && $Object.hasOwnProperty.call(message, "rejectedProfiles"))
                                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                    object.rejectedProfiles = typeof message.rejectedProfiles === "number" ? $BigInt(message.rejectedProfiles) : $util.Long.fromBits(message.rejectedProfiles.low >>> 0, message.rejectedProfiles.high >>> 0, false).toBigInt();
                                else if (typeof message.rejectedProfiles === "number")
                                    object.rejectedProfiles = options.longs === $String ? $String(message.rejectedProfiles) : message.rejectedProfiles;
                                else
                                    object.rejectedProfiles = options.longs === $String ? $util.Long.prototype.toString.call(message.rejectedProfiles) : options.longs === $Number ? new $util.LongBits(message.rejectedProfiles.low >>> 0, message.rejectedProfiles.high >>> 0).toNumber() : message.rejectedProfiles;
                            if (message.errorMessage != null && $Object.hasOwnProperty.call(message, "errorMessage"))
                                object.errorMessage = message.errorMessage;
                            return object;
                        };

                        /**
                         * Converts this ExportProfilesPartialSuccess to JSON.
                         * @function toJSON
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ExportProfilesPartialSuccess.prototype.toJSON = function() {
                            return ExportProfilesPartialSuccess.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the type url for ExportProfilesPartialSuccess
                         * @function getTypeUrl
                         * @memberof opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess
                         * @static
                         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                         * @returns {string} The type url
                         */
                        ExportProfilesPartialSuccess.getTypeUrl = function(prefix) {
                            if (prefix === $undefined)
                                prefix = "type.googleapis.com";
                            return prefix + "/opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess";
                        };

                        return ExportProfilesPartialSuccess;
                    })();

                    return v1development;
                })();

                return profiles;
            })();

            return collector;
        })();

        proto.profiles = (function() {

            /**
             * Namespace profiles.
             * @memberof opentelemetry.proto
             * @namespace
             */
            var profiles = {};

            profiles.v1development = (function() {

                /**
                 * Namespace v1development.
                 * @memberof opentelemetry.proto.profiles
                 * @namespace
                 */
                var v1development = {};

                v1development.ProfilesDictionary = (function() {

                    /**
                     * Properties of a ProfilesDictionary.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Mapping.$Properties>|null} [mappingTable] ProfilesDictionary mappingTable
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Location.$Properties>|null} [locationTable] ProfilesDictionary locationTable
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Function.$Properties>|null} [functionTable] ProfilesDictionary functionTable
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Link.$Properties>|null} [linkTable] ProfilesDictionary linkTable
                     * @property {Array.<string>|null} [stringTable] ProfilesDictionary stringTable
                     * @property {Array.<opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties>|null} [attributeTable] ProfilesDictionary attributeTable
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Stack.$Properties>|null} [stackTable] ProfilesDictionary stackTable
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a ProfilesDictionary.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IProfilesDictionary
                     * @augments opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties instead.
                     */

                    /**
                     * Shape of a ProfilesDictionary.
                     * @typedef {{
                     *   mappingTable?: Array.<opentelemetry.proto.profiles.v1development.Mapping.$Shape>|null;
                     *   locationTable?: Array.<opentelemetry.proto.profiles.v1development.Location.$Shape>|null;
                     *   functionTable?: Array.<opentelemetry.proto.profiles.v1development.Function.$Shape>|null;
                     *   linkTable?: Array.<opentelemetry.proto.profiles.v1development.Link.$Shape>|null;
                     *   stringTable?: Array.<string>|null;
                     *   attributeTable?: Array.<opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape>|null;
                     *   stackTable?: Array.<opentelemetry.proto.profiles.v1development.Stack.$Shape>|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape
                     */

                    /**
                     * Constructs a new ProfilesDictionary.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a ProfilesDictionary.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var ProfilesDictionary = function (properties) {
                        this.mappingTable = [];
                        this.locationTable = [];
                        this.functionTable = [];
                        this.linkTable = [];
                        this.stringTable = [];
                        this.attributeTable = [];
                        this.stackTable = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * ProfilesDictionary mappingTable.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Mapping.$Properties>} mappingTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.mappingTable = $util.emptyArray;

                    /**
                     * ProfilesDictionary locationTable.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Location.$Properties>} locationTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.locationTable = $util.emptyArray;

                    /**
                     * ProfilesDictionary functionTable.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Function.$Properties>} functionTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.functionTable = $util.emptyArray;

                    /**
                     * ProfilesDictionary linkTable.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Link.$Properties>} linkTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.linkTable = $util.emptyArray;

                    /**
                     * ProfilesDictionary stringTable.
                     * @member {Array.<string>} stringTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.stringTable = $util.emptyArray;

                    /**
                     * ProfilesDictionary attributeTable.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties>} attributeTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.attributeTable = $util.emptyArray;

                    /**
                     * ProfilesDictionary stackTable.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Stack.$Properties>} stackTable
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     */
                    ProfilesDictionary.prototype.stackTable = $util.emptyArray;

                    /**
                     * Creates a new ProfilesDictionary instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesDictionary} ProfilesDictionary instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape): opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties): opentelemetry.proto.profiles.v1development.ProfilesDictionary;
                     * }}
                     */
                    ProfilesDictionary.create = function(properties) {
                        return new ProfilesDictionary(properties);
                    };

                    /**
                     * Encodes the specified ProfilesDictionary message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesDictionary.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties} message ProfilesDictionary message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProfilesDictionary.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.mappingTable != null && message.mappingTable.length)
                            for (var i = 0; i < message.mappingTable.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Mapping.encode(message.mappingTable[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.locationTable != null && message.locationTable.length)
                            for (var i = 0; i < message.locationTable.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Location.encode(message.locationTable[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.functionTable != null && message.functionTable.length)
                            for (var i = 0; i < message.functionTable.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Function.encode(message.functionTable[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                        if (message.linkTable != null && message.linkTable.length)
                            for (var i = 0; i < message.linkTable.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Link.encode(message.linkTable[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), _depth + 1).ldelim();
                        if (message.stringTable != null && message.stringTable.length)
                            for (var i = 0; i < message.stringTable.length; ++i)
                                writer.uint32(/* id 5, wireType 2 =*/42).string(message.stringTable[i]);
                        if (message.attributeTable != null && message.attributeTable.length)
                            for (var i = 0; i < message.attributeTable.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit.encode(message.attributeTable[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
                        if (message.stackTable != null && message.stackTable.length)
                            for (var i = 0; i < message.stackTable.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Stack.encode(message.stackTable[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ProfilesDictionary message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesDictionary.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties} message ProfilesDictionary message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProfilesDictionary.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a ProfilesDictionary message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape} ProfilesDictionary
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProfilesDictionary.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary();
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.mappingTable && message.mappingTable.length))
                                        message.mappingTable = [];
                                    message.mappingTable.push($root.opentelemetry.proto.profiles.v1development.Mapping.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.locationTable && message.locationTable.length))
                                        message.locationTable = [];
                                    message.locationTable.push($root.opentelemetry.proto.profiles.v1development.Location.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.functionTable && message.functionTable.length))
                                        message.functionTable = [];
                                    message.functionTable.push($root.opentelemetry.proto.profiles.v1development.Function.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.linkTable && message.linkTable.length))
                                        message.linkTable = [];
                                    message.linkTable.push($root.opentelemetry.proto.profiles.v1development.Link.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 5: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.stringTable && message.stringTable.length))
                                        message.stringTable = [];
                                    message.stringTable.push(reader.stringVerify());
                                    continue;
                                }
                            case 6: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.attributeTable && message.attributeTable.length))
                                        message.attributeTable = [];
                                    message.attributeTable.push($root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 7: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.stackTable && message.stackTable.length))
                                        message.stackTable = [];
                                    message.stackTable.push($root.opentelemetry.proto.profiles.v1development.Stack.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a ProfilesDictionary message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape} ProfilesDictionary
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProfilesDictionary.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProfilesDictionary message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProfilesDictionary.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.mappingTable != null && $Object.hasOwnProperty.call(message, "mappingTable")) {
                            if (!$Array.isArray(message.mappingTable))
                                return "mappingTable: array expected";
                            for (var i = 0; i < message.mappingTable.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Mapping.verify(message.mappingTable[i], _depth + 1);
                                if (error)
                                    return "mappingTable." + error;
                            }
                        }
                        if (message.locationTable != null && $Object.hasOwnProperty.call(message, "locationTable")) {
                            if (!$Array.isArray(message.locationTable))
                                return "locationTable: array expected";
                            for (var i = 0; i < message.locationTable.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Location.verify(message.locationTable[i], _depth + 1);
                                if (error)
                                    return "locationTable." + error;
                            }
                        }
                        if (message.functionTable != null && $Object.hasOwnProperty.call(message, "functionTable")) {
                            if (!$Array.isArray(message.functionTable))
                                return "functionTable: array expected";
                            for (var i = 0; i < message.functionTable.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Function.verify(message.functionTable[i], _depth + 1);
                                if (error)
                                    return "functionTable." + error;
                            }
                        }
                        if (message.linkTable != null && $Object.hasOwnProperty.call(message, "linkTable")) {
                            if (!$Array.isArray(message.linkTable))
                                return "linkTable: array expected";
                            for (var i = 0; i < message.linkTable.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Link.verify(message.linkTable[i], _depth + 1);
                                if (error)
                                    return "linkTable." + error;
                            }
                        }
                        if (message.stringTable != null && $Object.hasOwnProperty.call(message, "stringTable")) {
                            if (!$Array.isArray(message.stringTable))
                                return "stringTable: array expected";
                            for (var i = 0; i < message.stringTable.length; ++i)
                                if (!$util.isString(message.stringTable[i]))
                                    return "stringTable: string[] expected";
                        }
                        if (message.attributeTable != null && $Object.hasOwnProperty.call(message, "attributeTable")) {
                            if (!$Array.isArray(message.attributeTable))
                                return "attributeTable: array expected";
                            for (var i = 0; i < message.attributeTable.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit.verify(message.attributeTable[i], _depth + 1);
                                if (error)
                                    return "attributeTable." + error;
                            }
                        }
                        if (message.stackTable != null && $Object.hasOwnProperty.call(message, "stackTable")) {
                            if (!$Array.isArray(message.stackTable))
                                return "stackTable: array expected";
                            for (var i = 0; i < message.stackTable.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Stack.verify(message.stackTable[i], _depth + 1);
                                if (error)
                                    return "stackTable." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a ProfilesDictionary message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesDictionary} ProfilesDictionary
                     */
                    ProfilesDictionary.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary();
                        if (object.mappingTable) {
                            if (!$Array.isArray(object.mappingTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.mappingTable: array expected");
                            message.mappingTable = $Array(object.mappingTable.length);
                            for (var i = 0; i < object.mappingTable.length; ++i) {
                                if (!$util.isObject(object.mappingTable[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.mappingTable: object expected");
                                message.mappingTable[i] = $root.opentelemetry.proto.profiles.v1development.Mapping.fromObject(object.mappingTable[i], _depth + 1);
                            }
                        }
                        if (object.locationTable) {
                            if (!$Array.isArray(object.locationTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.locationTable: array expected");
                            message.locationTable = $Array(object.locationTable.length);
                            for (var i = 0; i < object.locationTable.length; ++i) {
                                if (!$util.isObject(object.locationTable[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.locationTable: object expected");
                                message.locationTable[i] = $root.opentelemetry.proto.profiles.v1development.Location.fromObject(object.locationTable[i], _depth + 1);
                            }
                        }
                        if (object.functionTable) {
                            if (!$Array.isArray(object.functionTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.functionTable: array expected");
                            message.functionTable = $Array(object.functionTable.length);
                            for (var i = 0; i < object.functionTable.length; ++i) {
                                if (!$util.isObject(object.functionTable[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.functionTable: object expected");
                                message.functionTable[i] = $root.opentelemetry.proto.profiles.v1development.Function.fromObject(object.functionTable[i], _depth + 1);
                            }
                        }
                        if (object.linkTable) {
                            if (!$Array.isArray(object.linkTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.linkTable: array expected");
                            message.linkTable = $Array(object.linkTable.length);
                            for (var i = 0; i < object.linkTable.length; ++i) {
                                if (!$util.isObject(object.linkTable[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.linkTable: object expected");
                                message.linkTable[i] = $root.opentelemetry.proto.profiles.v1development.Link.fromObject(object.linkTable[i], _depth + 1);
                            }
                        }
                        if (object.stringTable) {
                            if (!$Array.isArray(object.stringTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.stringTable: array expected");
                            message.stringTable = $Array(object.stringTable.length);
                            for (var i = 0; i < object.stringTable.length; ++i)
                                message.stringTable[i] = $String(object.stringTable[i]);
                        }
                        if (object.attributeTable) {
                            if (!$Array.isArray(object.attributeTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.attributeTable: array expected");
                            message.attributeTable = $Array(object.attributeTable.length);
                            for (var i = 0; i < object.attributeTable.length; ++i) {
                                if (!$util.isObject(object.attributeTable[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.attributeTable: object expected");
                                message.attributeTable[i] = $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit.fromObject(object.attributeTable[i], _depth + 1);
                            }
                        }
                        if (object.stackTable) {
                            if (!$Array.isArray(object.stackTable))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.stackTable: array expected");
                            message.stackTable = $Array(object.stackTable.length);
                            for (var i = 0; i < object.stackTable.length; ++i) {
                                if (!$util.isObject(object.stackTable[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesDictionary.stackTable: object expected");
                                message.stackTable[i] = $root.opentelemetry.proto.profiles.v1development.Stack.fromObject(object.stackTable[i], _depth + 1);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProfilesDictionary message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesDictionary} message ProfilesDictionary
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProfilesDictionary.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.mappingTable = [];
                            object.locationTable = [];
                            object.functionTable = [];
                            object.linkTable = [];
                            object.stringTable = [];
                            object.attributeTable = [];
                            object.stackTable = [];
                        }
                        if (message.mappingTable && message.mappingTable.length) {
                            object.mappingTable = $Array(message.mappingTable.length);
                            for (var j = 0; j < message.mappingTable.length; ++j)
                                object.mappingTable[j] = $root.opentelemetry.proto.profiles.v1development.Mapping.toObject(message.mappingTable[j], options, _depth + 1);
                        }
                        if (message.locationTable && message.locationTable.length) {
                            object.locationTable = $Array(message.locationTable.length);
                            for (var j = 0; j < message.locationTable.length; ++j)
                                object.locationTable[j] = $root.opentelemetry.proto.profiles.v1development.Location.toObject(message.locationTable[j], options, _depth + 1);
                        }
                        if (message.functionTable && message.functionTable.length) {
                            object.functionTable = $Array(message.functionTable.length);
                            for (var j = 0; j < message.functionTable.length; ++j)
                                object.functionTable[j] = $root.opentelemetry.proto.profiles.v1development.Function.toObject(message.functionTable[j], options, _depth + 1);
                        }
                        if (message.linkTable && message.linkTable.length) {
                            object.linkTable = $Array(message.linkTable.length);
                            for (var j = 0; j < message.linkTable.length; ++j)
                                object.linkTable[j] = $root.opentelemetry.proto.profiles.v1development.Link.toObject(message.linkTable[j], options, _depth + 1);
                        }
                        if (message.stringTable && message.stringTable.length) {
                            object.stringTable = $Array(message.stringTable.length);
                            for (var j = 0; j < message.stringTable.length; ++j)
                                object.stringTable[j] = message.stringTable[j];
                        }
                        if (message.attributeTable && message.attributeTable.length) {
                            object.attributeTable = $Array(message.attributeTable.length);
                            for (var j = 0; j < message.attributeTable.length; ++j)
                                object.attributeTable[j] = $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit.toObject(message.attributeTable[j], options, _depth + 1);
                        }
                        if (message.stackTable && message.stackTable.length) {
                            object.stackTable = $Array(message.stackTable.length);
                            for (var j = 0; j < message.stackTable.length; ++j)
                                object.stackTable[j] = $root.opentelemetry.proto.profiles.v1development.Stack.toObject(message.stackTable[j], options, _depth + 1);
                        }
                        return object;
                    };

                    /**
                     * Converts this ProfilesDictionary to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProfilesDictionary.prototype.toJSON = function() {
                        return ProfilesDictionary.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for ProfilesDictionary
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesDictionary
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    ProfilesDictionary.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.ProfilesDictionary";
                    };

                    return ProfilesDictionary;
                })();

                v1development.ProfilesData = (function() {

                    /**
                     * Properties of a ProfilesData.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.ProfilesData.$Properties
                     * @property {Array.<opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties>|null} [resourceProfiles] ProfilesData resourceProfiles
                     * @property {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null} [dictionary] ProfilesData dictionary
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a ProfilesData.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IProfilesData
                     * @augments opentelemetry.proto.profiles.v1development.ProfilesData.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.ProfilesData.$Properties instead.
                     */

                    /**
                     * Shape of a ProfilesData.
                     * @typedef {{
                     *   resourceProfiles?: Array.<opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape>|null;
                     *   dictionary?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.profiles.v1development.ProfilesData.$Shape
                     */

                    /**
                     * Constructs a new ProfilesData.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a ProfilesData.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesData.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var ProfilesData = function (properties) {
                        this.resourceProfiles = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * ProfilesData resourceProfiles.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties>} resourceProfiles
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @instance
                     */
                    ProfilesData.prototype.resourceProfiles = $util.emptyArray;

                    /**
                     * ProfilesData dictionary.
                     * @member {opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null|undefined} dictionary
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @instance
                     */
                    ProfilesData.prototype.dictionary = null;

                    /**
                     * Creates a new ProfilesData instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesData.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesData} ProfilesData instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.ProfilesData.$Shape): opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.ProfilesData.$Properties): opentelemetry.proto.profiles.v1development.ProfilesData;
                     * }}
                     */
                    ProfilesData.create = function(properties) {
                        return new ProfilesData(properties);
                    };

                    /**
                     * Encodes the specified ProfilesData message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesData.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesData.$Properties} message ProfilesData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProfilesData.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.resourceProfiles != null && message.resourceProfiles.length)
                            for (var i = 0; i < message.resourceProfiles.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.encode(message.resourceProfiles[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.dictionary != null && $Object.hasOwnProperty.call(message, "dictionary"))
                            $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.encode(message.dictionary, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ProfilesData message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesData.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesData.$Properties} message ProfilesData message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProfilesData.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a ProfilesData message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape} ProfilesData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProfilesData.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.ProfilesData(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.resourceProfiles && message.resourceProfiles.length))
                                        message.resourceProfiles = [];
                                    message.resourceProfiles.push($root.opentelemetry.proto.profiles.v1development.ResourceProfiles.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    message.dictionary = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.decode(reader, reader.uint32(), $undefined, _depth + 1, message.dictionary);
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a ProfilesData message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape} ProfilesData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProfilesData.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ProfilesData message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProfilesData.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.resourceProfiles != null && $Object.hasOwnProperty.call(message, "resourceProfiles")) {
                            if (!$Array.isArray(message.resourceProfiles))
                                return "resourceProfiles: array expected";
                            for (var i = 0; i < message.resourceProfiles.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.verify(message.resourceProfiles[i], _depth + 1);
                                if (error)
                                    return "resourceProfiles." + error;
                            }
                        }
                        if (message.dictionary != null && $Object.hasOwnProperty.call(message, "dictionary")) {
                            var error = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.verify(message.dictionary, _depth + 1);
                            if (error)
                                return "dictionary." + error;
                        }
                        return null;
                    };

                    /**
                     * Creates a ProfilesData message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesData} ProfilesData
                     */
                    ProfilesData.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.ProfilesData)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesData: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.ProfilesData();
                        if (object.resourceProfiles) {
                            if (!$Array.isArray(object.resourceProfiles))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesData.resourceProfiles: array expected");
                            message.resourceProfiles = $Array(object.resourceProfiles.length);
                            for (var i = 0; i < object.resourceProfiles.length; ++i) {
                                if (!$util.isObject(object.resourceProfiles[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesData.resourceProfiles: object expected");
                                message.resourceProfiles[i] = $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.fromObject(object.resourceProfiles[i], _depth + 1);
                            }
                        }
                        if (object.dictionary != null) {
                            if (!$util.isObject(object.dictionary))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ProfilesData.dictionary: object expected");
                            message.dictionary = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.fromObject(object.dictionary, _depth + 1);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a ProfilesData message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ProfilesData} message ProfilesData
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProfilesData.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.resourceProfiles = [];
                        if (options.defaults)
                            object.dictionary = null;
                        if (message.resourceProfiles && message.resourceProfiles.length) {
                            object.resourceProfiles = $Array(message.resourceProfiles.length);
                            for (var j = 0; j < message.resourceProfiles.length; ++j)
                                object.resourceProfiles[j] = $root.opentelemetry.proto.profiles.v1development.ResourceProfiles.toObject(message.resourceProfiles[j], options, _depth + 1);
                        }
                        if (message.dictionary != null && $Object.hasOwnProperty.call(message, "dictionary"))
                            object.dictionary = $root.opentelemetry.proto.profiles.v1development.ProfilesDictionary.toObject(message.dictionary, options, _depth + 1);
                        return object;
                    };

                    /**
                     * Converts this ProfilesData to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProfilesData.prototype.toJSON = function() {
                        return ProfilesData.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for ProfilesData
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ProfilesData
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    ProfilesData.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.ProfilesData";
                    };

                    return ProfilesData;
                })();

                v1development.ResourceProfiles = (function() {

                    /**
                     * Properties of a ResourceProfiles.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties
                     * @property {opentelemetry.proto.resource.v1.Resource.$Properties|null} [resource] ResourceProfiles resource
                     * @property {Array.<opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties>|null} [scopeProfiles] ResourceProfiles scopeProfiles
                     * @property {string|null} [schemaUrl] ResourceProfiles schemaUrl
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a ResourceProfiles.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IResourceProfiles
                     * @augments opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties instead.
                     */

                    /**
                     * Shape of a ResourceProfiles.
                     * @typedef {{
                     *   resource?: opentelemetry.proto.resource.v1.Resource.$Shape|null;
                     *   scopeProfiles?: Array.<opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape>|null;
                     *   schemaUrl?: string|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape
                     */

                    /**
                     * Constructs a new ResourceProfiles.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a ResourceProfiles.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var ResourceProfiles = function (properties) {
                        this.scopeProfiles = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * ResourceProfiles resource.
                     * @member {opentelemetry.proto.resource.v1.Resource.$Properties|null|undefined} resource
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @instance
                     */
                    ResourceProfiles.prototype.resource = null;

                    /**
                     * ResourceProfiles scopeProfiles.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties>} scopeProfiles
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @instance
                     */
                    ResourceProfiles.prototype.scopeProfiles = $util.emptyArray;

                    /**
                     * ResourceProfiles schemaUrl.
                     * @member {string} schemaUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @instance
                     */
                    ResourceProfiles.prototype.schemaUrl = "";

                    /**
                     * Creates a new ResourceProfiles instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.ResourceProfiles} ResourceProfiles instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape): opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties): opentelemetry.proto.profiles.v1development.ResourceProfiles;
                     * }}
                     */
                    ResourceProfiles.create = function(properties) {
                        return new ResourceProfiles(properties);
                    };

                    /**
                     * Encodes the specified ResourceProfiles message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ResourceProfiles.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties} message ResourceProfiles message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ResourceProfiles.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.resource != null && $Object.hasOwnProperty.call(message, "resource"))
                            $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.scopeProfiles != null && message.scopeProfiles.length)
                            for (var i = 0; i < message.scopeProfiles.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.ScopeProfiles.encode(message.scopeProfiles[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl") && message.schemaUrl !== "")
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.schemaUrl);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ResourceProfiles message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ResourceProfiles.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties} message ResourceProfiles message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ResourceProfiles.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a ResourceProfiles message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape} ResourceProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ResourceProfiles.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.ResourceProfiles(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32(), $undefined, _depth + 1, message.resource);
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.scopeProfiles && message.scopeProfiles.length))
                                        message.scopeProfiles = [];
                                    message.scopeProfiles.push($root.opentelemetry.proto.profiles.v1development.ScopeProfiles.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.schemaUrl = value;
                                    else
                                        delete message.schemaUrl;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a ResourceProfiles message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape} ResourceProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ResourceProfiles.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ResourceProfiles message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ResourceProfiles.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.resource != null && $Object.hasOwnProperty.call(message, "resource")) {
                            var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource, _depth + 1);
                            if (error)
                                return "resource." + error;
                        }
                        if (message.scopeProfiles != null && $Object.hasOwnProperty.call(message, "scopeProfiles")) {
                            if (!$Array.isArray(message.scopeProfiles))
                                return "scopeProfiles: array expected";
                            for (var i = 0; i < message.scopeProfiles.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.ScopeProfiles.verify(message.scopeProfiles[i], _depth + 1);
                                if (error)
                                    return "scopeProfiles." + error;
                            }
                        }
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl"))
                            if (!$util.isString(message.schemaUrl))
                                return "schemaUrl: string expected";
                        return null;
                    };

                    /**
                     * Creates a ResourceProfiles message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.ResourceProfiles} ResourceProfiles
                     */
                    ResourceProfiles.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.ResourceProfiles)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.ResourceProfiles: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.ResourceProfiles();
                        if (object.resource != null) {
                            if (!$util.isObject(object.resource))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ResourceProfiles.resource: object expected");
                            message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource, _depth + 1);
                        }
                        if (object.scopeProfiles) {
                            if (!$Array.isArray(object.scopeProfiles))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ResourceProfiles.scopeProfiles: array expected");
                            message.scopeProfiles = $Array(object.scopeProfiles.length);
                            for (var i = 0; i < object.scopeProfiles.length; ++i) {
                                if (!$util.isObject(object.scopeProfiles[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ResourceProfiles.scopeProfiles: object expected");
                                message.scopeProfiles[i] = $root.opentelemetry.proto.profiles.v1development.ScopeProfiles.fromObject(object.scopeProfiles[i], _depth + 1);
                            }
                        }
                        if (object.schemaUrl != null)
                            if (typeof object.schemaUrl !== "string" || object.schemaUrl.length)
                                message.schemaUrl = $String(object.schemaUrl);
                        return message;
                    };

                    /**
                     * Creates a plain object from a ResourceProfiles message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ResourceProfiles} message ResourceProfiles
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ResourceProfiles.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.scopeProfiles = [];
                        if (options.defaults) {
                            object.resource = null;
                            object.schemaUrl = "";
                        }
                        if (message.resource != null && $Object.hasOwnProperty.call(message, "resource"))
                            object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options, _depth + 1);
                        if (message.scopeProfiles && message.scopeProfiles.length) {
                            object.scopeProfiles = $Array(message.scopeProfiles.length);
                            for (var j = 0; j < message.scopeProfiles.length; ++j)
                                object.scopeProfiles[j] = $root.opentelemetry.proto.profiles.v1development.ScopeProfiles.toObject(message.scopeProfiles[j], options, _depth + 1);
                        }
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl"))
                            object.schemaUrl = message.schemaUrl;
                        return object;
                    };

                    /**
                     * Converts this ResourceProfiles to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ResourceProfiles.prototype.toJSON = function() {
                        return ResourceProfiles.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for ResourceProfiles
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ResourceProfiles
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    ResourceProfiles.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.ResourceProfiles";
                    };

                    return ResourceProfiles;
                })();

                v1development.ScopeProfiles = (function() {

                    /**
                     * Properties of a ScopeProfiles.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties
                     * @property {opentelemetry.proto.common.v1.InstrumentationScope.$Properties|null} [scope] ScopeProfiles scope
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Profile.$Properties>|null} [profiles] ScopeProfiles profiles
                     * @property {string|null} [schemaUrl] ScopeProfiles schemaUrl
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a ScopeProfiles.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IScopeProfiles
                     * @augments opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties instead.
                     */

                    /**
                     * Shape of a ScopeProfiles.
                     * @typedef {{
                     *   scope?: opentelemetry.proto.common.v1.InstrumentationScope.$Shape|null;
                     *   profiles?: Array.<opentelemetry.proto.profiles.v1development.Profile.$Shape>|null;
                     *   schemaUrl?: string|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape
                     */

                    /**
                     * Constructs a new ScopeProfiles.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a ScopeProfiles.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var ScopeProfiles = function (properties) {
                        this.profiles = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * ScopeProfiles scope.
                     * @member {opentelemetry.proto.common.v1.InstrumentationScope.$Properties|null|undefined} scope
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @instance
                     */
                    ScopeProfiles.prototype.scope = null;

                    /**
                     * ScopeProfiles profiles.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Profile.$Properties>} profiles
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @instance
                     */
                    ScopeProfiles.prototype.profiles = $util.emptyArray;

                    /**
                     * ScopeProfiles schemaUrl.
                     * @member {string} schemaUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @instance
                     */
                    ScopeProfiles.prototype.schemaUrl = "";

                    /**
                     * Creates a new ScopeProfiles instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.ScopeProfiles} ScopeProfiles instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape): opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties): opentelemetry.proto.profiles.v1development.ScopeProfiles;
                     * }}
                     */
                    ScopeProfiles.create = function(properties) {
                        return new ScopeProfiles(properties);
                    };

                    /**
                     * Encodes the specified ScopeProfiles message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ScopeProfiles.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties} message ScopeProfiles message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ScopeProfiles.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.scope != null && $Object.hasOwnProperty.call(message, "scope"))
                            $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.profiles != null && message.profiles.length)
                            for (var i = 0; i < message.profiles.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Profile.encode(message.profiles[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl") && message.schemaUrl !== "")
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.schemaUrl);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ScopeProfiles message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ScopeProfiles.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties} message ScopeProfiles message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ScopeProfiles.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a ScopeProfiles message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape} ScopeProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ScopeProfiles.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.ScopeProfiles(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32(), $undefined, _depth + 1, message.scope);
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.profiles && message.profiles.length))
                                        message.profiles = [];
                                    message.profiles.push($root.opentelemetry.proto.profiles.v1development.Profile.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.schemaUrl = value;
                                    else
                                        delete message.schemaUrl;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a ScopeProfiles message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape} ScopeProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ScopeProfiles.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ScopeProfiles message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ScopeProfiles.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.scope != null && $Object.hasOwnProperty.call(message, "scope")) {
                            var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope, _depth + 1);
                            if (error)
                                return "scope." + error;
                        }
                        if (message.profiles != null && $Object.hasOwnProperty.call(message, "profiles")) {
                            if (!$Array.isArray(message.profiles))
                                return "profiles: array expected";
                            for (var i = 0; i < message.profiles.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Profile.verify(message.profiles[i], _depth + 1);
                                if (error)
                                    return "profiles." + error;
                            }
                        }
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl"))
                            if (!$util.isString(message.schemaUrl))
                                return "schemaUrl: string expected";
                        return null;
                    };

                    /**
                     * Creates a ScopeProfiles message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.ScopeProfiles} ScopeProfiles
                     */
                    ScopeProfiles.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.ScopeProfiles)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.ScopeProfiles: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.ScopeProfiles();
                        if (object.scope != null) {
                            if (!$util.isObject(object.scope))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ScopeProfiles.scope: object expected");
                            message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope, _depth + 1);
                        }
                        if (object.profiles) {
                            if (!$Array.isArray(object.profiles))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.ScopeProfiles.profiles: array expected");
                            message.profiles = $Array(object.profiles.length);
                            for (var i = 0; i < object.profiles.length; ++i) {
                                if (!$util.isObject(object.profiles[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.ScopeProfiles.profiles: object expected");
                                message.profiles[i] = $root.opentelemetry.proto.profiles.v1development.Profile.fromObject(object.profiles[i], _depth + 1);
                            }
                        }
                        if (object.schemaUrl != null)
                            if (typeof object.schemaUrl !== "string" || object.schemaUrl.length)
                                message.schemaUrl = $String(object.schemaUrl);
                        return message;
                    };

                    /**
                     * Creates a plain object from a ScopeProfiles message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ScopeProfiles} message ScopeProfiles
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ScopeProfiles.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.profiles = [];
                        if (options.defaults) {
                            object.scope = null;
                            object.schemaUrl = "";
                        }
                        if (message.scope != null && $Object.hasOwnProperty.call(message, "scope"))
                            object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options, _depth + 1);
                        if (message.profiles && message.profiles.length) {
                            object.profiles = $Array(message.profiles.length);
                            for (var j = 0; j < message.profiles.length; ++j)
                                object.profiles[j] = $root.opentelemetry.proto.profiles.v1development.Profile.toObject(message.profiles[j], options, _depth + 1);
                        }
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl"))
                            object.schemaUrl = message.schemaUrl;
                        return object;
                    };

                    /**
                     * Converts this ScopeProfiles to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ScopeProfiles.prototype.toJSON = function() {
                        return ScopeProfiles.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for ScopeProfiles
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ScopeProfiles
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    ScopeProfiles.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.ScopeProfiles";
                    };

                    return ScopeProfiles;
                })();

                v1development.Profile = (function() {

                    /**
                     * Properties of a Profile.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Profile.$Properties
                     * @property {opentelemetry.proto.profiles.v1development.ValueType.$Properties|null} [sampleType] Profile sampleType
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Sample.$Properties>|null} [samples] Profile samples
                     * @property {number|Long|null} [timeUnixNano] Profile timeUnixNano
                     * @property {number|Long|null} [durationNano] Profile durationNano
                     * @property {opentelemetry.proto.profiles.v1development.ValueType.$Properties|null} [periodType] Profile periodType
                     * @property {number|Long|null} [period] Profile period
                     * @property {Uint8Array|null} [profileId] Profile profileId
                     * @property {number|null} [droppedAttributesCount] Profile droppedAttributesCount
                     * @property {string|null} [originalPayloadFormat] Profile originalPayloadFormat
                     * @property {Uint8Array|null} [originalPayload] Profile originalPayload
                     * @property {Array.<number>|null} [attributeIndices] Profile attributeIndices
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Profile.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IProfile
                     * @augments opentelemetry.proto.profiles.v1development.Profile.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Profile.$Properties instead.
                     */

                    /**
                     * Shape of a Profile.
                     * @typedef {opentelemetry.proto.profiles.v1development.Profile.$Properties} opentelemetry.proto.profiles.v1development.Profile.$Shape
                     */

                    /**
                     * Constructs a new Profile.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Profile.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Profile.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Profile = function (properties) {
                        this.samples = [];
                        this.attributeIndices = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Profile sampleType.
                     * @member {opentelemetry.proto.profiles.v1development.ValueType.$Properties|null|undefined} sampleType
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.sampleType = null;

                    /**
                     * Profile samples.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Sample.$Properties>} samples
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.samples = $util.emptyArray;

                    /**
                     * Profile timeUnixNano.
                     * @member {number|Long} timeUnixNano
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.timeUnixNano = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Profile durationNano.
                     * @member {number|Long} durationNano
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.durationNano = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Profile periodType.
                     * @member {opentelemetry.proto.profiles.v1development.ValueType.$Properties|null|undefined} periodType
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.periodType = null;

                    /**
                     * Profile period.
                     * @member {number|Long} period
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.period = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Profile profileId.
                     * @member {Uint8Array} profileId
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.profileId = $util.newBuffer([]);

                    /**
                     * Profile droppedAttributesCount.
                     * @member {number} droppedAttributesCount
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.droppedAttributesCount = 0;

                    /**
                     * Profile originalPayloadFormat.
                     * @member {string} originalPayloadFormat
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.originalPayloadFormat = "";

                    /**
                     * Profile originalPayload.
                     * @member {Uint8Array} originalPayload
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.originalPayload = $util.newBuffer([]);

                    /**
                     * Profile attributeIndices.
                     * @member {Array.<number>} attributeIndices
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     */
                    Profile.prototype.attributeIndices = $util.emptyArray;

                    /**
                     * Creates a new Profile instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Profile.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Profile} Profile instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Profile.$Shape): opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Profile.$Properties): opentelemetry.proto.profiles.v1development.Profile;
                     * }}
                     */
                    Profile.create = function(properties) {
                        return new Profile(properties);
                    };

                    /**
                     * Encodes the specified Profile message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Profile.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Profile.$Properties} message Profile message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Profile.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.sampleType != null && $Object.hasOwnProperty.call(message, "sampleType"))
                            $root.opentelemetry.proto.profiles.v1development.ValueType.encode(message.sampleType, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.samples != null && message.samples.length)
                            for (var i = 0; i < message.samples.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Sample.encode(message.samples[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.timeUnixNano != null && $Object.hasOwnProperty.call(message, "timeUnixNano") && (typeof message.timeUnixNano === "object" ? message.timeUnixNano.low || message.timeUnixNano.high : message.timeUnixNano !== 0))
                            writer.uint32(/* id 3, wireType 1 =*/25).fixed64(message.timeUnixNano);
                        if (message.durationNano != null && $Object.hasOwnProperty.call(message, "durationNano") && (typeof message.durationNano === "object" ? message.durationNano.low || message.durationNano.high : message.durationNano !== 0))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.durationNano);
                        if (message.periodType != null && $Object.hasOwnProperty.call(message, "periodType"))
                            $root.opentelemetry.proto.profiles.v1development.ValueType.encode(message.periodType, writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
                        if (message.period != null && $Object.hasOwnProperty.call(message, "period") && (typeof message.period === "object" ? message.period.low || message.period.high : message.period !== 0))
                            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.period);
                        if (message.profileId != null && $Object.hasOwnProperty.call(message, "profileId") && message.profileId.length)
                            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.profileId);
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount") && message.droppedAttributesCount !== 0)
                            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.droppedAttributesCount);
                        if (message.originalPayloadFormat != null && $Object.hasOwnProperty.call(message, "originalPayloadFormat") && message.originalPayloadFormat !== "")
                            writer.uint32(/* id 9, wireType 2 =*/74).string(message.originalPayloadFormat);
                        if (message.originalPayload != null && $Object.hasOwnProperty.call(message, "originalPayload") && message.originalPayload.length)
                            writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.originalPayload);
                        if (message.attributeIndices != null && message.attributeIndices.length)
                            writer.uint32(/* id 11, wireType 2 =*/90).int32s(message.attributeIndices);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Profile message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Profile.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Profile.$Properties} message Profile message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Profile.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Profile message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape} Profile
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Profile.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Profile(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    message.sampleType = $root.opentelemetry.proto.profiles.v1development.ValueType.decode(reader, reader.uint32(), $undefined, _depth + 1, message.sampleType);
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.samples && message.samples.length))
                                        message.samples = [];
                                    message.samples.push($root.opentelemetry.proto.profiles.v1development.Sample.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 1)
                                        break;
                                    if (typeof (value = reader.fixed64()) === "object" ? value.low || value.high : value !== 0)
                                        message.timeUnixNano = value;
                                    else
                                        delete message.timeUnixNano;
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                        message.durationNano = value;
                                    else
                                        delete message.durationNano;
                                    continue;
                                }
                            case 5: {
                                    if (wireType !== 2)
                                        break;
                                    message.periodType = $root.opentelemetry.proto.profiles.v1development.ValueType.decode(reader, reader.uint32(), $undefined, _depth + 1, message.periodType);
                                    continue;
                                }
                            case 6: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                        message.period = value;
                                    else
                                        delete message.period;
                                    continue;
                                }
                            case 7: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.bytes()).length)
                                        message.profileId = value;
                                    else
                                        delete message.profileId;
                                    continue;
                                }
                            case 8: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.uint32())
                                        message.droppedAttributesCount = value;
                                    else
                                        delete message.droppedAttributesCount;
                                    continue;
                                }
                            case 9: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.originalPayloadFormat = value;
                                    else
                                        delete message.originalPayloadFormat;
                                    continue;
                                }
                            case 10: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.bytes()).length)
                                        message.originalPayload = value;
                                    else
                                        delete message.originalPayload;
                                    continue;
                                }
                            case 11: {
                                    if (wireType === 2) {
                                        if (!(message.attributeIndices && message.attributeIndices.length))
                                            message.attributeIndices = [];
                                        reader.int32s(message.attributeIndices);
                                        continue;
                                    }
                                    if (wireType !== 0)
                                        break;
                                    if (!(message.attributeIndices && message.attributeIndices.length))
                                        message.attributeIndices = [];
                                    message.attributeIndices.push(reader.int32());
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Profile message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape} Profile
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Profile.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Profile message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Profile.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.sampleType != null && $Object.hasOwnProperty.call(message, "sampleType")) {
                            var error = $root.opentelemetry.proto.profiles.v1development.ValueType.verify(message.sampleType, _depth + 1);
                            if (error)
                                return "sampleType." + error;
                        }
                        if (message.samples != null && $Object.hasOwnProperty.call(message, "samples")) {
                            if (!$Array.isArray(message.samples))
                                return "samples: array expected";
                            for (var i = 0; i < message.samples.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Sample.verify(message.samples[i], _depth + 1);
                                if (error)
                                    return "samples." + error;
                            }
                        }
                        if (message.timeUnixNano != null && $Object.hasOwnProperty.call(message, "timeUnixNano"))
                            if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                                return "timeUnixNano: integer|Long expected";
                        if (message.durationNano != null && $Object.hasOwnProperty.call(message, "durationNano"))
                            if (!$util.isInteger(message.durationNano) && !(message.durationNano && $util.isInteger(message.durationNano.low) && $util.isInteger(message.durationNano.high)))
                                return "durationNano: integer|Long expected";
                        if (message.periodType != null && $Object.hasOwnProperty.call(message, "periodType")) {
                            var error = $root.opentelemetry.proto.profiles.v1development.ValueType.verify(message.periodType, _depth + 1);
                            if (error)
                                return "periodType." + error;
                        }
                        if (message.period != null && $Object.hasOwnProperty.call(message, "period"))
                            if (!$util.isInteger(message.period) && !(message.period && $util.isInteger(message.period.low) && $util.isInteger(message.period.high)))
                                return "period: integer|Long expected";
                        if (message.profileId != null && $Object.hasOwnProperty.call(message, "profileId"))
                            if (!(message.profileId && typeof message.profileId.length === "number" || $util.isString(message.profileId)))
                                return "profileId: buffer expected";
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                            if (!$util.isInteger(message.droppedAttributesCount))
                                return "droppedAttributesCount: integer expected";
                        if (message.originalPayloadFormat != null && $Object.hasOwnProperty.call(message, "originalPayloadFormat"))
                            if (!$util.isString(message.originalPayloadFormat))
                                return "originalPayloadFormat: string expected";
                        if (message.originalPayload != null && $Object.hasOwnProperty.call(message, "originalPayload"))
                            if (!(message.originalPayload && typeof message.originalPayload.length === "number" || $util.isString(message.originalPayload)))
                                return "originalPayload: buffer expected";
                        if (message.attributeIndices != null && $Object.hasOwnProperty.call(message, "attributeIndices")) {
                            if (!$Array.isArray(message.attributeIndices))
                                return "attributeIndices: array expected";
                            for (var i = 0; i < message.attributeIndices.length; ++i)
                                if (!$util.isInteger(message.attributeIndices[i]))
                                    return "attributeIndices: integer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a Profile message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Profile} Profile
                     */
                    Profile.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Profile)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Profile: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Profile();
                        if (object.sampleType != null) {
                            if (!$util.isObject(object.sampleType))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Profile.sampleType: object expected");
                            message.sampleType = $root.opentelemetry.proto.profiles.v1development.ValueType.fromObject(object.sampleType, _depth + 1);
                        }
                        if (object.samples) {
                            if (!$Array.isArray(object.samples))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Profile.samples: array expected");
                            message.samples = $Array(object.samples.length);
                            for (var i = 0; i < object.samples.length; ++i) {
                                if (!$util.isObject(object.samples[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.Profile.samples: object expected");
                                message.samples[i] = $root.opentelemetry.proto.profiles.v1development.Sample.fromObject(object.samples[i], _depth + 1);
                            }
                        }
                        if (object.timeUnixNano != null)
                            if (typeof object.timeUnixNano === "object" ? object.timeUnixNano.low || object.timeUnixNano.high : $Number(object.timeUnixNano) !== 0)
                                if ($util.Long)
                                    message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano, true);
                                else if (typeof object.timeUnixNano === "string")
                                    message.timeUnixNano = $parseInt(object.timeUnixNano, 10);
                                else if (typeof object.timeUnixNano === "number")
                                    message.timeUnixNano = object.timeUnixNano;
                                else if (typeof object.timeUnixNano === "object")
                                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber(true);
                        if (object.durationNano != null)
                            if (typeof object.durationNano === "object" ? object.durationNano.low || object.durationNano.high : $Number(object.durationNano) !== 0)
                                if ($util.Long)
                                    message.durationNano = $util.Long.fromValue(object.durationNano, true);
                                else if (typeof object.durationNano === "string")
                                    message.durationNano = $parseInt(object.durationNano, 10);
                                else if (typeof object.durationNano === "number")
                                    message.durationNano = object.durationNano;
                                else if (typeof object.durationNano === "object")
                                    message.durationNano = new $util.LongBits(object.durationNano.low >>> 0, object.durationNano.high >>> 0).toNumber(true);
                        if (object.periodType != null) {
                            if (!$util.isObject(object.periodType))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Profile.periodType: object expected");
                            message.periodType = $root.opentelemetry.proto.profiles.v1development.ValueType.fromObject(object.periodType, _depth + 1);
                        }
                        if (object.period != null)
                            if (typeof object.period === "object" ? object.period.low || object.period.high : $Number(object.period) !== 0)
                                if ($util.Long)
                                    message.period = $util.Long.fromValue(object.period, false);
                                else if (typeof object.period === "string")
                                    message.period = $parseInt(object.period, 10);
                                else if (typeof object.period === "number")
                                    message.period = object.period;
                                else if (typeof object.period === "object")
                                    message.period = new $util.LongBits(object.period.low >>> 0, object.period.high >>> 0).toNumber();
                        if (object.profileId != null)
                            if (object.profileId.length)
                                if (typeof object.profileId === "string")
                                    $util.base64.decode(object.profileId, message.profileId = $util.newBuffer($util.base64.length(object.profileId)), 0);
                                else if (object.profileId.length >= 0)
                                    message.profileId = object.profileId;
                        if (object.droppedAttributesCount != null)
                            if ($Number(object.droppedAttributesCount) !== 0)
                                message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                        if (object.originalPayloadFormat != null)
                            if (typeof object.originalPayloadFormat !== "string" || object.originalPayloadFormat.length)
                                message.originalPayloadFormat = $String(object.originalPayloadFormat);
                        if (object.originalPayload != null)
                            if (object.originalPayload.length)
                                if (typeof object.originalPayload === "string")
                                    $util.base64.decode(object.originalPayload, message.originalPayload = $util.newBuffer($util.base64.length(object.originalPayload)), 0);
                                else if (object.originalPayload.length >= 0)
                                    message.originalPayload = object.originalPayload;
                        if (object.attributeIndices) {
                            if (!$Array.isArray(object.attributeIndices))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Profile.attributeIndices: array expected");
                            message.attributeIndices = $Array(object.attributeIndices.length);
                            for (var i = 0; i < object.attributeIndices.length; ++i)
                                message.attributeIndices[i] = object.attributeIndices[i] | 0;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Profile message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Profile} message Profile
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Profile.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.samples = [];
                            object.attributeIndices = [];
                        }
                        if (options.defaults) {
                            object.sampleType = null;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.timeUnixNano = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.timeUnixNano = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.durationNano = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.durationNano = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            object.periodType = null;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.period = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.period = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            if (options.bytes === $String)
                                object.profileId = "";
                            else {
                                object.profileId = [];
                                if (options.bytes !== $Array)
                                    object.profileId = $util.newBuffer(object.profileId);
                            }
                            object.droppedAttributesCount = 0;
                            object.originalPayloadFormat = "";
                            if (options.bytes === $String)
                                object.originalPayload = "";
                            else {
                                object.originalPayload = [];
                                if (options.bytes !== $Array)
                                    object.originalPayload = $util.newBuffer(object.originalPayload);
                            }
                        }
                        if (message.sampleType != null && $Object.hasOwnProperty.call(message, "sampleType"))
                            object.sampleType = $root.opentelemetry.proto.profiles.v1development.ValueType.toObject(message.sampleType, options, _depth + 1);
                        if (message.samples && message.samples.length) {
                            object.samples = $Array(message.samples.length);
                            for (var j = 0; j < message.samples.length; ++j)
                                object.samples[j] = $root.opentelemetry.proto.profiles.v1development.Sample.toObject(message.samples[j], options, _depth + 1);
                        }
                        if (message.timeUnixNano != null && $Object.hasOwnProperty.call(message, "timeUnixNano"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.timeUnixNano = typeof message.timeUnixNano === "number" ? $BigInt(message.timeUnixNano) : $util.Long.fromBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0, true).toBigInt();
                            else if (typeof message.timeUnixNano === "number")
                                object.timeUnixNano = options.longs === $String ? $String(message.timeUnixNano) : message.timeUnixNano;
                            else
                                object.timeUnixNano = options.longs === $String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === $Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber(true) : message.timeUnixNano;
                        if (message.durationNano != null && $Object.hasOwnProperty.call(message, "durationNano"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.durationNano = typeof message.durationNano === "number" ? $BigInt(message.durationNano) : $util.Long.fromBits(message.durationNano.low >>> 0, message.durationNano.high >>> 0, true).toBigInt();
                            else if (typeof message.durationNano === "number")
                                object.durationNano = options.longs === $String ? $String(message.durationNano) : message.durationNano;
                            else
                                object.durationNano = options.longs === $String ? $util.Long.prototype.toString.call(message.durationNano) : options.longs === $Number ? new $util.LongBits(message.durationNano.low >>> 0, message.durationNano.high >>> 0).toNumber(true) : message.durationNano;
                        if (message.periodType != null && $Object.hasOwnProperty.call(message, "periodType"))
                            object.periodType = $root.opentelemetry.proto.profiles.v1development.ValueType.toObject(message.periodType, options, _depth + 1);
                        if (message.period != null && $Object.hasOwnProperty.call(message, "period"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.period = typeof message.period === "number" ? $BigInt(message.period) : $util.Long.fromBits(message.period.low >>> 0, message.period.high >>> 0, false).toBigInt();
                            else if (typeof message.period === "number")
                                object.period = options.longs === $String ? $String(message.period) : message.period;
                            else
                                object.period = options.longs === $String ? $util.Long.prototype.toString.call(message.period) : options.longs === $Number ? new $util.LongBits(message.period.low >>> 0, message.period.high >>> 0).toNumber() : message.period;
                        if (message.profileId != null && $Object.hasOwnProperty.call(message, "profileId"))
                            object.profileId = options.bytes === $String ? $util.base64.encode(message.profileId, 0, message.profileId.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.profileId) : message.profileId;
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                            object.droppedAttributesCount = message.droppedAttributesCount;
                        if (message.originalPayloadFormat != null && $Object.hasOwnProperty.call(message, "originalPayloadFormat"))
                            object.originalPayloadFormat = message.originalPayloadFormat;
                        if (message.originalPayload != null && $Object.hasOwnProperty.call(message, "originalPayload"))
                            object.originalPayload = options.bytes === $String ? $util.base64.encode(message.originalPayload, 0, message.originalPayload.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.originalPayload) : message.originalPayload;
                        if (message.attributeIndices && message.attributeIndices.length) {
                            object.attributeIndices = $Array(message.attributeIndices.length);
                            for (var j = 0; j < message.attributeIndices.length; ++j)
                                object.attributeIndices[j] = message.attributeIndices[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Profile to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Profile.prototype.toJSON = function() {
                        return Profile.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Profile
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Profile
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Profile.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Profile";
                    };

                    return Profile;
                })();

                v1development.Link = (function() {

                    /**
                     * Properties of a Link.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Link.$Properties
                     * @property {Uint8Array|null} [traceId] Link traceId
                     * @property {Uint8Array|null} [spanId] Link spanId
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Link.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface ILink
                     * @augments opentelemetry.proto.profiles.v1development.Link.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Link.$Properties instead.
                     */

                    /**
                     * Shape of a Link.
                     * @typedef {opentelemetry.proto.profiles.v1development.Link.$Properties} opentelemetry.proto.profiles.v1development.Link.$Shape
                     */

                    /**
                     * Constructs a new Link.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Link.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Link.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Link = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Link traceId.
                     * @member {Uint8Array} traceId
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @instance
                     */
                    Link.prototype.traceId = $util.newBuffer([]);

                    /**
                     * Link spanId.
                     * @member {Uint8Array} spanId
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @instance
                     */
                    Link.prototype.spanId = $util.newBuffer([]);

                    /**
                     * Creates a new Link instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Link.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Link} Link instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Link.$Shape): opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Link.$Properties): opentelemetry.proto.profiles.v1development.Link;
                     * }}
                     */
                    Link.create = function(properties) {
                        return new Link(properties);
                    };

                    /**
                     * Encodes the specified Link message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Link.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Link.$Properties} message Link message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Link.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.traceId != null && $Object.hasOwnProperty.call(message, "traceId") && message.traceId.length)
                            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.traceId);
                        if (message.spanId != null && $Object.hasOwnProperty.call(message, "spanId") && message.spanId.length)
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.spanId);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Link message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Link.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Link.$Properties} message Link message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Link.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Link message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Link.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Link(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.bytes()).length)
                                        message.traceId = value;
                                    else
                                        delete message.traceId;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.bytes()).length)
                                        message.spanId = value;
                                    else
                                        delete message.spanId;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Link message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Link.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Link message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Link.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.traceId != null && $Object.hasOwnProperty.call(message, "traceId"))
                            if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                                return "traceId: buffer expected";
                        if (message.spanId != null && $Object.hasOwnProperty.call(message, "spanId"))
                            if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                                return "spanId: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a Link message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Link} Link
                     */
                    Link.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Link)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Link: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Link();
                        if (object.traceId != null)
                            if (object.traceId.length)
                                if (typeof object.traceId === "string")
                                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                                else if (object.traceId.length >= 0)
                                    message.traceId = object.traceId;
                        if (object.spanId != null)
                            if (object.spanId.length)
                                if (typeof object.spanId === "string")
                                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                                else if (object.spanId.length >= 0)
                                    message.spanId = object.spanId;
                        return message;
                    };

                    /**
                     * Creates a plain object from a Link message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Link} message Link
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Link.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.defaults) {
                            if (options.bytes === $String)
                                object.traceId = "";
                            else {
                                object.traceId = [];
                                if (options.bytes !== $Array)
                                    object.traceId = $util.newBuffer(object.traceId);
                            }
                            if (options.bytes === $String)
                                object.spanId = "";
                            else {
                                object.spanId = [];
                                if (options.bytes !== $Array)
                                    object.spanId = $util.newBuffer(object.spanId);
                            }
                        }
                        if (message.traceId != null && $Object.hasOwnProperty.call(message, "traceId"))
                            object.traceId = options.bytes === $String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.traceId) : message.traceId;
                        if (message.spanId != null && $Object.hasOwnProperty.call(message, "spanId"))
                            object.spanId = options.bytes === $String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.spanId) : message.spanId;
                        return object;
                    };

                    /**
                     * Converts this Link to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Link.prototype.toJSON = function() {
                        return Link.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Link
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Link
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Link.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Link";
                    };

                    return Link;
                })();

                v1development.ValueType = (function() {

                    /**
                     * Properties of a ValueType.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.ValueType.$Properties
                     * @property {number|null} [typeStrindex] ValueType typeStrindex
                     * @property {number|null} [unitStrindex] ValueType unitStrindex
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a ValueType.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IValueType
                     * @augments opentelemetry.proto.profiles.v1development.ValueType.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.ValueType.$Properties instead.
                     */

                    /**
                     * Shape of a ValueType.
                     * @typedef {opentelemetry.proto.profiles.v1development.ValueType.$Properties} opentelemetry.proto.profiles.v1development.ValueType.$Shape
                     */

                    /**
                     * Constructs a new ValueType.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a ValueType.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.ValueType.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var ValueType = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * ValueType typeStrindex.
                     * @member {number} typeStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @instance
                     */
                    ValueType.prototype.typeStrindex = 0;

                    /**
                     * ValueType unitStrindex.
                     * @member {number} unitStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @instance
                     */
                    ValueType.prototype.unitStrindex = 0;

                    /**
                     * Creates a new ValueType instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ValueType.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.ValueType} ValueType instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.ValueType.$Shape): opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.ValueType.$Properties): opentelemetry.proto.profiles.v1development.ValueType;
                     * }}
                     */
                    ValueType.create = function(properties) {
                        return new ValueType(properties);
                    };

                    /**
                     * Encodes the specified ValueType message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ValueType.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ValueType.$Properties} message ValueType message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ValueType.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.typeStrindex != null && $Object.hasOwnProperty.call(message, "typeStrindex") && message.typeStrindex !== 0)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.typeStrindex);
                        if (message.unitStrindex != null && $Object.hasOwnProperty.call(message, "unitStrindex") && message.unitStrindex !== 0)
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.unitStrindex);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ValueType message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ValueType.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ValueType.$Properties} message ValueType message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ValueType.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a ValueType message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape} ValueType
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ValueType.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.ValueType(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.typeStrindex = value;
                                    else
                                        delete message.typeStrindex;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.unitStrindex = value;
                                    else
                                        delete message.unitStrindex;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a ValueType message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape} ValueType
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ValueType.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ValueType message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ValueType.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.typeStrindex != null && $Object.hasOwnProperty.call(message, "typeStrindex"))
                            if (!$util.isInteger(message.typeStrindex))
                                return "typeStrindex: integer expected";
                        if (message.unitStrindex != null && $Object.hasOwnProperty.call(message, "unitStrindex"))
                            if (!$util.isInteger(message.unitStrindex))
                                return "unitStrindex: integer expected";
                        return null;
                    };

                    /**
                     * Creates a ValueType message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.ValueType} ValueType
                     */
                    ValueType.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.ValueType)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.ValueType: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.ValueType();
                        if (object.typeStrindex != null)
                            if ($Number(object.typeStrindex) !== 0)
                                message.typeStrindex = object.typeStrindex | 0;
                        if (object.unitStrindex != null)
                            if ($Number(object.unitStrindex) !== 0)
                                message.unitStrindex = object.unitStrindex | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a ValueType message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.ValueType} message ValueType
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ValueType.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.defaults) {
                            object.typeStrindex = 0;
                            object.unitStrindex = 0;
                        }
                        if (message.typeStrindex != null && $Object.hasOwnProperty.call(message, "typeStrindex"))
                            object.typeStrindex = message.typeStrindex;
                        if (message.unitStrindex != null && $Object.hasOwnProperty.call(message, "unitStrindex"))
                            object.unitStrindex = message.unitStrindex;
                        return object;
                    };

                    /**
                     * Converts this ValueType to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ValueType.prototype.toJSON = function() {
                        return ValueType.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for ValueType
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.ValueType
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    ValueType.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.ValueType";
                    };

                    return ValueType;
                })();

                v1development.Sample = (function() {

                    /**
                     * Properties of a Sample.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Sample.$Properties
                     * @property {number|null} [stackIndex] Sample stackIndex
                     * @property {Array.<number>|null} [attributeIndices] Sample attributeIndices
                     * @property {number|null} [linkIndex] Sample linkIndex
                     * @property {Array.<number|Long>|null} [values] Sample values
                     * @property {Array.<number|Long>|null} [timestampsUnixNano] Sample timestampsUnixNano
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Sample.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface ISample
                     * @augments opentelemetry.proto.profiles.v1development.Sample.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Sample.$Properties instead.
                     */

                    /**
                     * Shape of a Sample.
                     * @typedef {opentelemetry.proto.profiles.v1development.Sample.$Properties} opentelemetry.proto.profiles.v1development.Sample.$Shape
                     */

                    /**
                     * Constructs a new Sample.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Sample.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Sample.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Sample = function (properties) {
                        this.attributeIndices = [];
                        this.values = [];
                        this.timestampsUnixNano = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Sample stackIndex.
                     * @member {number} stackIndex
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @instance
                     */
                    Sample.prototype.stackIndex = 0;

                    /**
                     * Sample attributeIndices.
                     * @member {Array.<number>} attributeIndices
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @instance
                     */
                    Sample.prototype.attributeIndices = $util.emptyArray;

                    /**
                     * Sample linkIndex.
                     * @member {number} linkIndex
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @instance
                     */
                    Sample.prototype.linkIndex = 0;

                    /**
                     * Sample values.
                     * @member {Array.<number|Long>} values
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @instance
                     */
                    Sample.prototype.values = $util.emptyArray;

                    /**
                     * Sample timestampsUnixNano.
                     * @member {Array.<number|Long>} timestampsUnixNano
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @instance
                     */
                    Sample.prototype.timestampsUnixNano = $util.emptyArray;

                    /**
                     * Creates a new Sample instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Sample.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Sample} Sample instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Sample.$Shape): opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Sample.$Properties): opentelemetry.proto.profiles.v1development.Sample;
                     * }}
                     */
                    Sample.create = function(properties) {
                        return new Sample(properties);
                    };

                    /**
                     * Encodes the specified Sample message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Sample.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Sample.$Properties} message Sample message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Sample.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.stackIndex != null && $Object.hasOwnProperty.call(message, "stackIndex") && message.stackIndex !== 0)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.stackIndex);
                        if (message.attributeIndices != null && message.attributeIndices.length)
                            writer.uint32(/* id 2, wireType 2 =*/18).int32s(message.attributeIndices);
                        if (message.linkIndex != null && $Object.hasOwnProperty.call(message, "linkIndex") && message.linkIndex !== 0)
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.linkIndex);
                        if (message.values != null && message.values.length)
                            writer.uint32(/* id 4, wireType 2 =*/34).int64s(message.values);
                        if (message.timestampsUnixNano != null && message.timestampsUnixNano.length)
                            writer.uint32(/* id 5, wireType 2 =*/42).fixed64s(message.timestampsUnixNano);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Sample message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Sample.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Sample.$Properties} message Sample message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Sample.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Sample message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape} Sample
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Sample.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Sample(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.stackIndex = value;
                                    else
                                        delete message.stackIndex;
                                    continue;
                                }
                            case 2: {
                                    if (wireType === 2) {
                                        if (!(message.attributeIndices && message.attributeIndices.length))
                                            message.attributeIndices = [];
                                        reader.int32s(message.attributeIndices);
                                        continue;
                                    }
                                    if (wireType !== 0)
                                        break;
                                    if (!(message.attributeIndices && message.attributeIndices.length))
                                        message.attributeIndices = [];
                                    message.attributeIndices.push(reader.int32());
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.linkIndex = value;
                                    else
                                        delete message.linkIndex;
                                    continue;
                                }
                            case 4: {
                                    if (wireType === 2) {
                                        if (!(message.values && message.values.length))
                                            message.values = [];
                                        reader.int64s(message.values);
                                        continue;
                                    }
                                    if (wireType !== 0)
                                        break;
                                    if (!(message.values && message.values.length))
                                        message.values = [];
                                    message.values.push(reader.int64());
                                    continue;
                                }
                            case 5: {
                                    if (wireType === 2) {
                                        if (!(message.timestampsUnixNano && message.timestampsUnixNano.length))
                                            message.timestampsUnixNano = [];
                                        reader.fixed64s(message.timestampsUnixNano);
                                        continue;
                                    }
                                    if (wireType !== 1)
                                        break;
                                    if (!(message.timestampsUnixNano && message.timestampsUnixNano.length))
                                        message.timestampsUnixNano = [];
                                    message.timestampsUnixNano.push(reader.fixed64());
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Sample message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape} Sample
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Sample.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Sample message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Sample.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.stackIndex != null && $Object.hasOwnProperty.call(message, "stackIndex"))
                            if (!$util.isInteger(message.stackIndex))
                                return "stackIndex: integer expected";
                        if (message.attributeIndices != null && $Object.hasOwnProperty.call(message, "attributeIndices")) {
                            if (!$Array.isArray(message.attributeIndices))
                                return "attributeIndices: array expected";
                            for (var i = 0; i < message.attributeIndices.length; ++i)
                                if (!$util.isInteger(message.attributeIndices[i]))
                                    return "attributeIndices: integer[] expected";
                        }
                        if (message.linkIndex != null && $Object.hasOwnProperty.call(message, "linkIndex"))
                            if (!$util.isInteger(message.linkIndex))
                                return "linkIndex: integer expected";
                        if (message.values != null && $Object.hasOwnProperty.call(message, "values")) {
                            if (!$Array.isArray(message.values))
                                return "values: array expected";
                            for (var i = 0; i < message.values.length; ++i)
                                if (!$util.isInteger(message.values[i]) && !(message.values[i] && $util.isInteger(message.values[i].low) && $util.isInteger(message.values[i].high)))
                                    return "values: integer|Long[] expected";
                        }
                        if (message.timestampsUnixNano != null && $Object.hasOwnProperty.call(message, "timestampsUnixNano")) {
                            if (!$Array.isArray(message.timestampsUnixNano))
                                return "timestampsUnixNano: array expected";
                            for (var i = 0; i < message.timestampsUnixNano.length; ++i)
                                if (!$util.isInteger(message.timestampsUnixNano[i]) && !(message.timestampsUnixNano[i] && $util.isInteger(message.timestampsUnixNano[i].low) && $util.isInteger(message.timestampsUnixNano[i].high)))
                                    return "timestampsUnixNano: integer|Long[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a Sample message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Sample} Sample
                     */
                    Sample.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Sample)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Sample: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Sample();
                        if (object.stackIndex != null)
                            if ($Number(object.stackIndex) !== 0)
                                message.stackIndex = object.stackIndex | 0;
                        if (object.attributeIndices) {
                            if (!$Array.isArray(object.attributeIndices))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Sample.attributeIndices: array expected");
                            message.attributeIndices = $Array(object.attributeIndices.length);
                            for (var i = 0; i < object.attributeIndices.length; ++i)
                                message.attributeIndices[i] = object.attributeIndices[i] | 0;
                        }
                        if (object.linkIndex != null)
                            if ($Number(object.linkIndex) !== 0)
                                message.linkIndex = object.linkIndex | 0;
                        if (object.values) {
                            if (!$Array.isArray(object.values))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Sample.values: array expected");
                            message.values = $Array(object.values.length);
                            for (var i = 0; i < object.values.length; ++i)
                                if ($util.Long)
                                    message.values[i] = $util.Long.fromValue(object.values[i], false);
                                else if (typeof object.values[i] === "string")
                                    message.values[i] = $parseInt(object.values[i], 10);
                                else if (typeof object.values[i] === "number")
                                    message.values[i] = object.values[i];
                                else if (typeof object.values[i] === "object")
                                    message.values[i] = new $util.LongBits(object.values[i].low >>> 0, object.values[i].high >>> 0).toNumber();
                        }
                        if (object.timestampsUnixNano) {
                            if (!$Array.isArray(object.timestampsUnixNano))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Sample.timestampsUnixNano: array expected");
                            message.timestampsUnixNano = $Array(object.timestampsUnixNano.length);
                            for (var i = 0; i < object.timestampsUnixNano.length; ++i)
                                if ($util.Long)
                                    message.timestampsUnixNano[i] = $util.Long.fromValue(object.timestampsUnixNano[i], true);
                                else if (typeof object.timestampsUnixNano[i] === "string")
                                    message.timestampsUnixNano[i] = $parseInt(object.timestampsUnixNano[i], 10);
                                else if (typeof object.timestampsUnixNano[i] === "number")
                                    message.timestampsUnixNano[i] = object.timestampsUnixNano[i];
                                else if (typeof object.timestampsUnixNano[i] === "object")
                                    message.timestampsUnixNano[i] = new $util.LongBits(object.timestampsUnixNano[i].low >>> 0, object.timestampsUnixNano[i].high >>> 0).toNumber(true);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Sample message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Sample} message Sample
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Sample.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.attributeIndices = [];
                            object.values = [];
                            object.timestampsUnixNano = [];
                        }
                        if (options.defaults) {
                            object.stackIndex = 0;
                            object.linkIndex = 0;
                        }
                        if (message.stackIndex != null && $Object.hasOwnProperty.call(message, "stackIndex"))
                            object.stackIndex = message.stackIndex;
                        if (message.attributeIndices && message.attributeIndices.length) {
                            object.attributeIndices = $Array(message.attributeIndices.length);
                            for (var j = 0; j < message.attributeIndices.length; ++j)
                                object.attributeIndices[j] = message.attributeIndices[j];
                        }
                        if (message.linkIndex != null && $Object.hasOwnProperty.call(message, "linkIndex"))
                            object.linkIndex = message.linkIndex;
                        if (message.values && message.values.length) {
                            object.values = $Array(message.values.length);
                            for (var j = 0; j < message.values.length; ++j)
                                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                    object.values[j] = typeof message.values[j] === "number" ? $BigInt(message.values[j]) : $util.Long.fromBits(message.values[j].low >>> 0, message.values[j].high >>> 0, false).toBigInt();
                                else if (typeof message.values[j] === "number")
                                    object.values[j] = options.longs === $String ? $String(message.values[j]) : message.values[j];
                                else
                                    object.values[j] = options.longs === $String ? $util.Long.prototype.toString.call(message.values[j]) : options.longs === $Number ? new $util.LongBits(message.values[j].low >>> 0, message.values[j].high >>> 0).toNumber() : message.values[j];
                        }
                        if (message.timestampsUnixNano && message.timestampsUnixNano.length) {
                            object.timestampsUnixNano = $Array(message.timestampsUnixNano.length);
                            for (var j = 0; j < message.timestampsUnixNano.length; ++j)
                                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                    object.timestampsUnixNano[j] = typeof message.timestampsUnixNano[j] === "number" ? $BigInt(message.timestampsUnixNano[j]) : $util.Long.fromBits(message.timestampsUnixNano[j].low >>> 0, message.timestampsUnixNano[j].high >>> 0, true).toBigInt();
                                else if (typeof message.timestampsUnixNano[j] === "number")
                                    object.timestampsUnixNano[j] = options.longs === $String ? $String(message.timestampsUnixNano[j]) : message.timestampsUnixNano[j];
                                else
                                    object.timestampsUnixNano[j] = options.longs === $String ? $util.Long.prototype.toString.call(message.timestampsUnixNano[j]) : options.longs === $Number ? new $util.LongBits(message.timestampsUnixNano[j].low >>> 0, message.timestampsUnixNano[j].high >>> 0).toNumber(true) : message.timestampsUnixNano[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Sample to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Sample.prototype.toJSON = function() {
                        return Sample.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Sample
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Sample
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Sample.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Sample";
                    };

                    return Sample;
                })();

                v1development.Mapping = (function() {

                    /**
                     * Properties of a Mapping.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Mapping.$Properties
                     * @property {number|Long|null} [memoryStart] Mapping memoryStart
                     * @property {number|Long|null} [memoryLimit] Mapping memoryLimit
                     * @property {number|Long|null} [fileOffset] Mapping fileOffset
                     * @property {number|null} [filenameStrindex] Mapping filenameStrindex
                     * @property {Array.<number>|null} [attributeIndices] Mapping attributeIndices
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Mapping.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IMapping
                     * @augments opentelemetry.proto.profiles.v1development.Mapping.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Mapping.$Properties instead.
                     */

                    /**
                     * Shape of a Mapping.
                     * @typedef {opentelemetry.proto.profiles.v1development.Mapping.$Properties} opentelemetry.proto.profiles.v1development.Mapping.$Shape
                     */

                    /**
                     * Constructs a new Mapping.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Mapping.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Mapping.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Mapping = function (properties) {
                        this.attributeIndices = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Mapping memoryStart.
                     * @member {number|Long} memoryStart
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @instance
                     */
                    Mapping.prototype.memoryStart = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Mapping memoryLimit.
                     * @member {number|Long} memoryLimit
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @instance
                     */
                    Mapping.prototype.memoryLimit = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Mapping fileOffset.
                     * @member {number|Long} fileOffset
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @instance
                     */
                    Mapping.prototype.fileOffset = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Mapping filenameStrindex.
                     * @member {number} filenameStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @instance
                     */
                    Mapping.prototype.filenameStrindex = 0;

                    /**
                     * Mapping attributeIndices.
                     * @member {Array.<number>} attributeIndices
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @instance
                     */
                    Mapping.prototype.attributeIndices = $util.emptyArray;

                    /**
                     * Creates a new Mapping instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Mapping.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Mapping} Mapping instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Mapping.$Shape): opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Mapping.$Properties): opentelemetry.proto.profiles.v1development.Mapping;
                     * }}
                     */
                    Mapping.create = function(properties) {
                        return new Mapping(properties);
                    };

                    /**
                     * Encodes the specified Mapping message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Mapping.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Mapping.$Properties} message Mapping message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Mapping.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.memoryStart != null && $Object.hasOwnProperty.call(message, "memoryStart") && (typeof message.memoryStart === "object" ? message.memoryStart.low || message.memoryStart.high : message.memoryStart !== 0))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.memoryStart);
                        if (message.memoryLimit != null && $Object.hasOwnProperty.call(message, "memoryLimit") && (typeof message.memoryLimit === "object" ? message.memoryLimit.low || message.memoryLimit.high : message.memoryLimit !== 0))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.memoryLimit);
                        if (message.fileOffset != null && $Object.hasOwnProperty.call(message, "fileOffset") && (typeof message.fileOffset === "object" ? message.fileOffset.low || message.fileOffset.high : message.fileOffset !== 0))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.fileOffset);
                        if (message.filenameStrindex != null && $Object.hasOwnProperty.call(message, "filenameStrindex") && message.filenameStrindex !== 0)
                            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.filenameStrindex);
                        if (message.attributeIndices != null && message.attributeIndices.length)
                            writer.uint32(/* id 5, wireType 2 =*/42).int32s(message.attributeIndices);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Mapping message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Mapping.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Mapping.$Properties} message Mapping message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Mapping.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Mapping message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape} Mapping
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Mapping.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Mapping(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                        message.memoryStart = value;
                                    else
                                        delete message.memoryStart;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                        message.memoryLimit = value;
                                    else
                                        delete message.memoryLimit;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                        message.fileOffset = value;
                                    else
                                        delete message.fileOffset;
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.filenameStrindex = value;
                                    else
                                        delete message.filenameStrindex;
                                    continue;
                                }
                            case 5: {
                                    if (wireType === 2) {
                                        if (!(message.attributeIndices && message.attributeIndices.length))
                                            message.attributeIndices = [];
                                        reader.int32s(message.attributeIndices);
                                        continue;
                                    }
                                    if (wireType !== 0)
                                        break;
                                    if (!(message.attributeIndices && message.attributeIndices.length))
                                        message.attributeIndices = [];
                                    message.attributeIndices.push(reader.int32());
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Mapping message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape} Mapping
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Mapping.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Mapping message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Mapping.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.memoryStart != null && $Object.hasOwnProperty.call(message, "memoryStart"))
                            if (!$util.isInteger(message.memoryStart) && !(message.memoryStart && $util.isInteger(message.memoryStart.low) && $util.isInteger(message.memoryStart.high)))
                                return "memoryStart: integer|Long expected";
                        if (message.memoryLimit != null && $Object.hasOwnProperty.call(message, "memoryLimit"))
                            if (!$util.isInteger(message.memoryLimit) && !(message.memoryLimit && $util.isInteger(message.memoryLimit.low) && $util.isInteger(message.memoryLimit.high)))
                                return "memoryLimit: integer|Long expected";
                        if (message.fileOffset != null && $Object.hasOwnProperty.call(message, "fileOffset"))
                            if (!$util.isInteger(message.fileOffset) && !(message.fileOffset && $util.isInteger(message.fileOffset.low) && $util.isInteger(message.fileOffset.high)))
                                return "fileOffset: integer|Long expected";
                        if (message.filenameStrindex != null && $Object.hasOwnProperty.call(message, "filenameStrindex"))
                            if (!$util.isInteger(message.filenameStrindex))
                                return "filenameStrindex: integer expected";
                        if (message.attributeIndices != null && $Object.hasOwnProperty.call(message, "attributeIndices")) {
                            if (!$Array.isArray(message.attributeIndices))
                                return "attributeIndices: array expected";
                            for (var i = 0; i < message.attributeIndices.length; ++i)
                                if (!$util.isInteger(message.attributeIndices[i]))
                                    return "attributeIndices: integer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a Mapping message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Mapping} Mapping
                     */
                    Mapping.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Mapping)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Mapping: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Mapping();
                        if (object.memoryStart != null)
                            if (typeof object.memoryStart === "object" ? object.memoryStart.low || object.memoryStart.high : $Number(object.memoryStart) !== 0)
                                if ($util.Long)
                                    message.memoryStart = $util.Long.fromValue(object.memoryStart, true);
                                else if (typeof object.memoryStart === "string")
                                    message.memoryStart = $parseInt(object.memoryStart, 10);
                                else if (typeof object.memoryStart === "number")
                                    message.memoryStart = object.memoryStart;
                                else if (typeof object.memoryStart === "object")
                                    message.memoryStart = new $util.LongBits(object.memoryStart.low >>> 0, object.memoryStart.high >>> 0).toNumber(true);
                        if (object.memoryLimit != null)
                            if (typeof object.memoryLimit === "object" ? object.memoryLimit.low || object.memoryLimit.high : $Number(object.memoryLimit) !== 0)
                                if ($util.Long)
                                    message.memoryLimit = $util.Long.fromValue(object.memoryLimit, true);
                                else if (typeof object.memoryLimit === "string")
                                    message.memoryLimit = $parseInt(object.memoryLimit, 10);
                                else if (typeof object.memoryLimit === "number")
                                    message.memoryLimit = object.memoryLimit;
                                else if (typeof object.memoryLimit === "object")
                                    message.memoryLimit = new $util.LongBits(object.memoryLimit.low >>> 0, object.memoryLimit.high >>> 0).toNumber(true);
                        if (object.fileOffset != null)
                            if (typeof object.fileOffset === "object" ? object.fileOffset.low || object.fileOffset.high : $Number(object.fileOffset) !== 0)
                                if ($util.Long)
                                    message.fileOffset = $util.Long.fromValue(object.fileOffset, true);
                                else if (typeof object.fileOffset === "string")
                                    message.fileOffset = $parseInt(object.fileOffset, 10);
                                else if (typeof object.fileOffset === "number")
                                    message.fileOffset = object.fileOffset;
                                else if (typeof object.fileOffset === "object")
                                    message.fileOffset = new $util.LongBits(object.fileOffset.low >>> 0, object.fileOffset.high >>> 0).toNumber(true);
                        if (object.filenameStrindex != null)
                            if ($Number(object.filenameStrindex) !== 0)
                                message.filenameStrindex = object.filenameStrindex | 0;
                        if (object.attributeIndices) {
                            if (!$Array.isArray(object.attributeIndices))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Mapping.attributeIndices: array expected");
                            message.attributeIndices = $Array(object.attributeIndices.length);
                            for (var i = 0; i < object.attributeIndices.length; ++i)
                                message.attributeIndices[i] = object.attributeIndices[i] | 0;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Mapping message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Mapping} message Mapping
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Mapping.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.attributeIndices = [];
                        if (options.defaults) {
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.memoryStart = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.memoryStart = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.memoryLimit = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.memoryLimit = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.fileOffset = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.fileOffset = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            object.filenameStrindex = 0;
                        }
                        if (message.memoryStart != null && $Object.hasOwnProperty.call(message, "memoryStart"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.memoryStart = typeof message.memoryStart === "number" ? $BigInt(message.memoryStart) : $util.Long.fromBits(message.memoryStart.low >>> 0, message.memoryStart.high >>> 0, true).toBigInt();
                            else if (typeof message.memoryStart === "number")
                                object.memoryStart = options.longs === $String ? $String(message.memoryStart) : message.memoryStart;
                            else
                                object.memoryStart = options.longs === $String ? $util.Long.prototype.toString.call(message.memoryStart) : options.longs === $Number ? new $util.LongBits(message.memoryStart.low >>> 0, message.memoryStart.high >>> 0).toNumber(true) : message.memoryStart;
                        if (message.memoryLimit != null && $Object.hasOwnProperty.call(message, "memoryLimit"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.memoryLimit = typeof message.memoryLimit === "number" ? $BigInt(message.memoryLimit) : $util.Long.fromBits(message.memoryLimit.low >>> 0, message.memoryLimit.high >>> 0, true).toBigInt();
                            else if (typeof message.memoryLimit === "number")
                                object.memoryLimit = options.longs === $String ? $String(message.memoryLimit) : message.memoryLimit;
                            else
                                object.memoryLimit = options.longs === $String ? $util.Long.prototype.toString.call(message.memoryLimit) : options.longs === $Number ? new $util.LongBits(message.memoryLimit.low >>> 0, message.memoryLimit.high >>> 0).toNumber(true) : message.memoryLimit;
                        if (message.fileOffset != null && $Object.hasOwnProperty.call(message, "fileOffset"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.fileOffset = typeof message.fileOffset === "number" ? $BigInt(message.fileOffset) : $util.Long.fromBits(message.fileOffset.low >>> 0, message.fileOffset.high >>> 0, true).toBigInt();
                            else if (typeof message.fileOffset === "number")
                                object.fileOffset = options.longs === $String ? $String(message.fileOffset) : message.fileOffset;
                            else
                                object.fileOffset = options.longs === $String ? $util.Long.prototype.toString.call(message.fileOffset) : options.longs === $Number ? new $util.LongBits(message.fileOffset.low >>> 0, message.fileOffset.high >>> 0).toNumber(true) : message.fileOffset;
                        if (message.filenameStrindex != null && $Object.hasOwnProperty.call(message, "filenameStrindex"))
                            object.filenameStrindex = message.filenameStrindex;
                        if (message.attributeIndices && message.attributeIndices.length) {
                            object.attributeIndices = $Array(message.attributeIndices.length);
                            for (var j = 0; j < message.attributeIndices.length; ++j)
                                object.attributeIndices[j] = message.attributeIndices[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Mapping to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Mapping.prototype.toJSON = function() {
                        return Mapping.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Mapping
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Mapping
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Mapping.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Mapping";
                    };

                    return Mapping;
                })();

                v1development.Stack = (function() {

                    /**
                     * Properties of a Stack.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Stack.$Properties
                     * @property {Array.<number>|null} [locationIndices] Stack locationIndices
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Stack.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IStack
                     * @augments opentelemetry.proto.profiles.v1development.Stack.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Stack.$Properties instead.
                     */

                    /**
                     * Shape of a Stack.
                     * @typedef {opentelemetry.proto.profiles.v1development.Stack.$Properties} opentelemetry.proto.profiles.v1development.Stack.$Shape
                     */

                    /**
                     * Constructs a new Stack.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Stack.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Stack.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Stack = function (properties) {
                        this.locationIndices = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Stack locationIndices.
                     * @member {Array.<number>} locationIndices
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @instance
                     */
                    Stack.prototype.locationIndices = $util.emptyArray;

                    /**
                     * Creates a new Stack instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Stack.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Stack} Stack instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Stack.$Shape): opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Stack.$Properties): opentelemetry.proto.profiles.v1development.Stack;
                     * }}
                     */
                    Stack.create = function(properties) {
                        return new Stack(properties);
                    };

                    /**
                     * Encodes the specified Stack message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Stack.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Stack.$Properties} message Stack message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Stack.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.locationIndices != null && message.locationIndices.length)
                            writer.uint32(/* id 1, wireType 2 =*/10).int32s(message.locationIndices);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Stack message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Stack.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Stack.$Properties} message Stack message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Stack.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Stack message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape} Stack
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Stack.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Stack();
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType === 2) {
                                        if (!(message.locationIndices && message.locationIndices.length))
                                            message.locationIndices = [];
                                        reader.int32s(message.locationIndices);
                                        continue;
                                    }
                                    if (wireType !== 0)
                                        break;
                                    if (!(message.locationIndices && message.locationIndices.length))
                                        message.locationIndices = [];
                                    message.locationIndices.push(reader.int32());
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Stack message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape} Stack
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Stack.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Stack message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Stack.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.locationIndices != null && $Object.hasOwnProperty.call(message, "locationIndices")) {
                            if (!$Array.isArray(message.locationIndices))
                                return "locationIndices: array expected";
                            for (var i = 0; i < message.locationIndices.length; ++i)
                                if (!$util.isInteger(message.locationIndices[i]))
                                    return "locationIndices: integer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a Stack message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Stack} Stack
                     */
                    Stack.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Stack)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Stack: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Stack();
                        if (object.locationIndices) {
                            if (!$Array.isArray(object.locationIndices))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Stack.locationIndices: array expected");
                            message.locationIndices = $Array(object.locationIndices.length);
                            for (var i = 0; i < object.locationIndices.length; ++i)
                                message.locationIndices[i] = object.locationIndices[i] | 0;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Stack message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Stack} message Stack
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Stack.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.locationIndices = [];
                        if (message.locationIndices && message.locationIndices.length) {
                            object.locationIndices = $Array(message.locationIndices.length);
                            for (var j = 0; j < message.locationIndices.length; ++j)
                                object.locationIndices[j] = message.locationIndices[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Stack to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Stack.prototype.toJSON = function() {
                        return Stack.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Stack
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Stack
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Stack.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Stack";
                    };

                    return Stack;
                })();

                v1development.Location = (function() {

                    /**
                     * Properties of a Location.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Location.$Properties
                     * @property {number|null} [mappingIndex] Location mappingIndex
                     * @property {number|Long|null} [address] Location address
                     * @property {Array.<opentelemetry.proto.profiles.v1development.Line.$Properties>|null} [lines] Location lines
                     * @property {Array.<number>|null} [attributeIndices] Location attributeIndices
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Location.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface ILocation
                     * @augments opentelemetry.proto.profiles.v1development.Location.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Location.$Properties instead.
                     */

                    /**
                     * Shape of a Location.
                     * @typedef {opentelemetry.proto.profiles.v1development.Location.$Properties} opentelemetry.proto.profiles.v1development.Location.$Shape
                     */

                    /**
                     * Constructs a new Location.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Location.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Location.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Location = function (properties) {
                        this.lines = [];
                        this.attributeIndices = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Location mappingIndex.
                     * @member {number} mappingIndex
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @instance
                     */
                    Location.prototype.mappingIndex = 0;

                    /**
                     * Location address.
                     * @member {number|Long} address
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @instance
                     */
                    Location.prototype.address = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Location lines.
                     * @member {Array.<opentelemetry.proto.profiles.v1development.Line.$Properties>} lines
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @instance
                     */
                    Location.prototype.lines = $util.emptyArray;

                    /**
                     * Location attributeIndices.
                     * @member {Array.<number>} attributeIndices
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @instance
                     */
                    Location.prototype.attributeIndices = $util.emptyArray;

                    /**
                     * Creates a new Location instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Location.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Location} Location instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Location.$Shape): opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Location.$Properties): opentelemetry.proto.profiles.v1development.Location;
                     * }}
                     */
                    Location.create = function(properties) {
                        return new Location(properties);
                    };

                    /**
                     * Encodes the specified Location message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Location.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Location.$Properties} message Location message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Location.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.mappingIndex != null && $Object.hasOwnProperty.call(message, "mappingIndex") && message.mappingIndex !== 0)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mappingIndex);
                        if (message.address != null && $Object.hasOwnProperty.call(message, "address") && (typeof message.address === "object" ? message.address.low || message.address.high : message.address !== 0))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.address);
                        if (message.lines != null && message.lines.length)
                            for (var i = 0; i < message.lines.length; ++i)
                                $root.opentelemetry.proto.profiles.v1development.Line.encode(message.lines[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                        if (message.attributeIndices != null && message.attributeIndices.length)
                            writer.uint32(/* id 4, wireType 2 =*/34).int32s(message.attributeIndices);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Location message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Location.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Location.$Properties} message Location message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Location.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Location message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape} Location
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Location.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Location(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.mappingIndex = value;
                                    else
                                        delete message.mappingIndex;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                                        message.address = value;
                                    else
                                        delete message.address;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.lines && message.lines.length))
                                        message.lines = [];
                                    message.lines.push($root.opentelemetry.proto.profiles.v1development.Line.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 4: {
                                    if (wireType === 2) {
                                        if (!(message.attributeIndices && message.attributeIndices.length))
                                            message.attributeIndices = [];
                                        reader.int32s(message.attributeIndices);
                                        continue;
                                    }
                                    if (wireType !== 0)
                                        break;
                                    if (!(message.attributeIndices && message.attributeIndices.length))
                                        message.attributeIndices = [];
                                    message.attributeIndices.push(reader.int32());
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Location message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape} Location
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Location.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Location message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Location.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.mappingIndex != null && $Object.hasOwnProperty.call(message, "mappingIndex"))
                            if (!$util.isInteger(message.mappingIndex))
                                return "mappingIndex: integer expected";
                        if (message.address != null && $Object.hasOwnProperty.call(message, "address"))
                            if (!$util.isInteger(message.address) && !(message.address && $util.isInteger(message.address.low) && $util.isInteger(message.address.high)))
                                return "address: integer|Long expected";
                        if (message.lines != null && $Object.hasOwnProperty.call(message, "lines")) {
                            if (!$Array.isArray(message.lines))
                                return "lines: array expected";
                            for (var i = 0; i < message.lines.length; ++i) {
                                var error = $root.opentelemetry.proto.profiles.v1development.Line.verify(message.lines[i], _depth + 1);
                                if (error)
                                    return "lines." + error;
                            }
                        }
                        if (message.attributeIndices != null && $Object.hasOwnProperty.call(message, "attributeIndices")) {
                            if (!$Array.isArray(message.attributeIndices))
                                return "attributeIndices: array expected";
                            for (var i = 0; i < message.attributeIndices.length; ++i)
                                if (!$util.isInteger(message.attributeIndices[i]))
                                    return "attributeIndices: integer[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a Location message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Location} Location
                     */
                    Location.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Location)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Location: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Location();
                        if (object.mappingIndex != null)
                            if ($Number(object.mappingIndex) !== 0)
                                message.mappingIndex = object.mappingIndex | 0;
                        if (object.address != null)
                            if (typeof object.address === "object" ? object.address.low || object.address.high : $Number(object.address) !== 0)
                                if ($util.Long)
                                    message.address = $util.Long.fromValue(object.address, true);
                                else if (typeof object.address === "string")
                                    message.address = $parseInt(object.address, 10);
                                else if (typeof object.address === "number")
                                    message.address = object.address;
                                else if (typeof object.address === "object")
                                    message.address = new $util.LongBits(object.address.low >>> 0, object.address.high >>> 0).toNumber(true);
                        if (object.lines) {
                            if (!$Array.isArray(object.lines))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Location.lines: array expected");
                            message.lines = $Array(object.lines.length);
                            for (var i = 0; i < object.lines.length; ++i) {
                                if (!$util.isObject(object.lines[i]))
                                    throw $TypeError(".opentelemetry.proto.profiles.v1development.Location.lines: object expected");
                                message.lines[i] = $root.opentelemetry.proto.profiles.v1development.Line.fromObject(object.lines[i], _depth + 1);
                            }
                        }
                        if (object.attributeIndices) {
                            if (!$Array.isArray(object.attributeIndices))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.Location.attributeIndices: array expected");
                            message.attributeIndices = $Array(object.attributeIndices.length);
                            for (var i = 0; i < object.attributeIndices.length; ++i)
                                message.attributeIndices[i] = object.attributeIndices[i] | 0;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Location message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Location} message Location
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Location.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.lines = [];
                            object.attributeIndices = [];
                        }
                        if (options.defaults) {
                            object.mappingIndex = 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, true);
                                object.address = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.address = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                        }
                        if (message.mappingIndex != null && $Object.hasOwnProperty.call(message, "mappingIndex"))
                            object.mappingIndex = message.mappingIndex;
                        if (message.address != null && $Object.hasOwnProperty.call(message, "address"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.address = typeof message.address === "number" ? $BigInt(message.address) : $util.Long.fromBits(message.address.low >>> 0, message.address.high >>> 0, true).toBigInt();
                            else if (typeof message.address === "number")
                                object.address = options.longs === $String ? $String(message.address) : message.address;
                            else
                                object.address = options.longs === $String ? $util.Long.prototype.toString.call(message.address) : options.longs === $Number ? new $util.LongBits(message.address.low >>> 0, message.address.high >>> 0).toNumber(true) : message.address;
                        if (message.lines && message.lines.length) {
                            object.lines = $Array(message.lines.length);
                            for (var j = 0; j < message.lines.length; ++j)
                                object.lines[j] = $root.opentelemetry.proto.profiles.v1development.Line.toObject(message.lines[j], options, _depth + 1);
                        }
                        if (message.attributeIndices && message.attributeIndices.length) {
                            object.attributeIndices = $Array(message.attributeIndices.length);
                            for (var j = 0; j < message.attributeIndices.length; ++j)
                                object.attributeIndices[j] = message.attributeIndices[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Location to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Location.prototype.toJSON = function() {
                        return Location.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Location
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Location
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Location.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Location";
                    };

                    return Location;
                })();

                v1development.Line = (function() {

                    /**
                     * Properties of a Line.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Line.$Properties
                     * @property {number|null} [functionIndex] Line functionIndex
                     * @property {number|Long|null} [line] Line line
                     * @property {number|Long|null} [column] Line column
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Line.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface ILine
                     * @augments opentelemetry.proto.profiles.v1development.Line.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Line.$Properties instead.
                     */

                    /**
                     * Shape of a Line.
                     * @typedef {opentelemetry.proto.profiles.v1development.Line.$Properties} opentelemetry.proto.profiles.v1development.Line.$Shape
                     */

                    /**
                     * Constructs a new Line.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Line.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Line.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Line = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Line functionIndex.
                     * @member {number} functionIndex
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @instance
                     */
                    Line.prototype.functionIndex = 0;

                    /**
                     * Line line.
                     * @member {number|Long} line
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @instance
                     */
                    Line.prototype.line = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Line column.
                     * @member {number|Long} column
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @instance
                     */
                    Line.prototype.column = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Creates a new Line instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Line.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Line} Line instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Line.$Shape): opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Line.$Properties): opentelemetry.proto.profiles.v1development.Line;
                     * }}
                     */
                    Line.create = function(properties) {
                        return new Line(properties);
                    };

                    /**
                     * Encodes the specified Line message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Line.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Line.$Properties} message Line message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Line.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.functionIndex != null && $Object.hasOwnProperty.call(message, "functionIndex") && message.functionIndex !== 0)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.functionIndex);
                        if (message.line != null && $Object.hasOwnProperty.call(message, "line") && (typeof message.line === "object" ? message.line.low || message.line.high : message.line !== 0))
                            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.line);
                        if (message.column != null && $Object.hasOwnProperty.call(message, "column") && (typeof message.column === "object" ? message.column.low || message.column.high : message.column !== 0))
                            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.column);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Line message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Line.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Line.$Properties} message Line message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Line.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Line message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape} Line
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Line.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Line(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.functionIndex = value;
                                    else
                                        delete message.functionIndex;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                        message.line = value;
                                    else
                                        delete message.line;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                        message.column = value;
                                    else
                                        delete message.column;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Line message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape} Line
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Line.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Line message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Line.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.functionIndex != null && $Object.hasOwnProperty.call(message, "functionIndex"))
                            if (!$util.isInteger(message.functionIndex))
                                return "functionIndex: integer expected";
                        if (message.line != null && $Object.hasOwnProperty.call(message, "line"))
                            if (!$util.isInteger(message.line) && !(message.line && $util.isInteger(message.line.low) && $util.isInteger(message.line.high)))
                                return "line: integer|Long expected";
                        if (message.column != null && $Object.hasOwnProperty.call(message, "column"))
                            if (!$util.isInteger(message.column) && !(message.column && $util.isInteger(message.column.low) && $util.isInteger(message.column.high)))
                                return "column: integer|Long expected";
                        return null;
                    };

                    /**
                     * Creates a Line message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Line} Line
                     */
                    Line.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Line)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Line: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Line();
                        if (object.functionIndex != null)
                            if ($Number(object.functionIndex) !== 0)
                                message.functionIndex = object.functionIndex | 0;
                        if (object.line != null)
                            if (typeof object.line === "object" ? object.line.low || object.line.high : $Number(object.line) !== 0)
                                if ($util.Long)
                                    message.line = $util.Long.fromValue(object.line, false);
                                else if (typeof object.line === "string")
                                    message.line = $parseInt(object.line, 10);
                                else if (typeof object.line === "number")
                                    message.line = object.line;
                                else if (typeof object.line === "object")
                                    message.line = new $util.LongBits(object.line.low >>> 0, object.line.high >>> 0).toNumber();
                        if (object.column != null)
                            if (typeof object.column === "object" ? object.column.low || object.column.high : $Number(object.column) !== 0)
                                if ($util.Long)
                                    message.column = $util.Long.fromValue(object.column, false);
                                else if (typeof object.column === "string")
                                    message.column = $parseInt(object.column, 10);
                                else if (typeof object.column === "number")
                                    message.column = object.column;
                                else if (typeof object.column === "object")
                                    message.column = new $util.LongBits(object.column.low >>> 0, object.column.high >>> 0).toNumber();
                        return message;
                    };

                    /**
                     * Creates a plain object from a Line message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Line} message Line
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Line.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.defaults) {
                            object.functionIndex = 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.line = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.line = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.column = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.column = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                        }
                        if (message.functionIndex != null && $Object.hasOwnProperty.call(message, "functionIndex"))
                            object.functionIndex = message.functionIndex;
                        if (message.line != null && $Object.hasOwnProperty.call(message, "line"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.line = typeof message.line === "number" ? $BigInt(message.line) : $util.Long.fromBits(message.line.low >>> 0, message.line.high >>> 0, false).toBigInt();
                            else if (typeof message.line === "number")
                                object.line = options.longs === $String ? $String(message.line) : message.line;
                            else
                                object.line = options.longs === $String ? $util.Long.prototype.toString.call(message.line) : options.longs === $Number ? new $util.LongBits(message.line.low >>> 0, message.line.high >>> 0).toNumber() : message.line;
                        if (message.column != null && $Object.hasOwnProperty.call(message, "column"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.column = typeof message.column === "number" ? $BigInt(message.column) : $util.Long.fromBits(message.column.low >>> 0, message.column.high >>> 0, false).toBigInt();
                            else if (typeof message.column === "number")
                                object.column = options.longs === $String ? $String(message.column) : message.column;
                            else
                                object.column = options.longs === $String ? $util.Long.prototype.toString.call(message.column) : options.longs === $Number ? new $util.LongBits(message.column.low >>> 0, message.column.high >>> 0).toNumber() : message.column;
                        return object;
                    };

                    /**
                     * Converts this Line to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Line.prototype.toJSON = function() {
                        return Line.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Line
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Line
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Line.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Line";
                    };

                    return Line;
                })();

                v1development.Function = (function() {

                    /**
                     * Properties of a Function.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.Function.$Properties
                     * @property {number|null} [nameStrindex] Function nameStrindex
                     * @property {number|null} [systemNameStrindex] Function systemNameStrindex
                     * @property {number|null} [filenameStrindex] Function filenameStrindex
                     * @property {number|Long|null} [startLine] Function startLine
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Function.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IFunction
                     * @augments opentelemetry.proto.profiles.v1development.Function.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.Function.$Properties instead.
                     */

                    /**
                     * Shape of a Function.
                     * @typedef {opentelemetry.proto.profiles.v1development.Function.$Properties} opentelemetry.proto.profiles.v1development.Function.$Shape
                     */

                    /**
                     * Constructs a new Function.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a Function.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.Function.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Function = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Function nameStrindex.
                     * @member {number} nameStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @instance
                     */
                    Function.prototype.nameStrindex = 0;

                    /**
                     * Function systemNameStrindex.
                     * @member {number} systemNameStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @instance
                     */
                    Function.prototype.systemNameStrindex = 0;

                    /**
                     * Function filenameStrindex.
                     * @member {number} filenameStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @instance
                     */
                    Function.prototype.filenameStrindex = 0;

                    /**
                     * Function startLine.
                     * @member {number|Long} startLine
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @instance
                     */
                    Function.prototype.startLine = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                    /**
                     * Creates a new Function instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Function.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.Function} Function instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.Function.$Shape): opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.Function.$Properties): opentelemetry.proto.profiles.v1development.Function;
                     * }}
                     */
                    Function.create = function(properties) {
                        return new Function(properties);
                    };

                    /**
                     * Encodes the specified Function message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Function.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Function.$Properties} message Function message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Function.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.nameStrindex != null && $Object.hasOwnProperty.call(message, "nameStrindex") && message.nameStrindex !== 0)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nameStrindex);
                        if (message.systemNameStrindex != null && $Object.hasOwnProperty.call(message, "systemNameStrindex") && message.systemNameStrindex !== 0)
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.systemNameStrindex);
                        if (message.filenameStrindex != null && $Object.hasOwnProperty.call(message, "filenameStrindex") && message.filenameStrindex !== 0)
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.filenameStrindex);
                        if (message.startLine != null && $Object.hasOwnProperty.call(message, "startLine") && (typeof message.startLine === "object" ? message.startLine.low || message.startLine.high : message.startLine !== 0))
                            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.startLine);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Function message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Function.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Function.$Properties} message Function message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Function.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Function message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape} Function
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Function.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.Function(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.nameStrindex = value;
                                    else
                                        delete message.nameStrindex;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.systemNameStrindex = value;
                                    else
                                        delete message.systemNameStrindex;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.filenameStrindex = value;
                                    else
                                        delete message.filenameStrindex;
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 0)
                                        break;
                                    if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                        message.startLine = value;
                                    else
                                        delete message.startLine;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Function message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape} Function
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Function.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Function message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Function.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.nameStrindex != null && $Object.hasOwnProperty.call(message, "nameStrindex"))
                            if (!$util.isInteger(message.nameStrindex))
                                return "nameStrindex: integer expected";
                        if (message.systemNameStrindex != null && $Object.hasOwnProperty.call(message, "systemNameStrindex"))
                            if (!$util.isInteger(message.systemNameStrindex))
                                return "systemNameStrindex: integer expected";
                        if (message.filenameStrindex != null && $Object.hasOwnProperty.call(message, "filenameStrindex"))
                            if (!$util.isInteger(message.filenameStrindex))
                                return "filenameStrindex: integer expected";
                        if (message.startLine != null && $Object.hasOwnProperty.call(message, "startLine"))
                            if (!$util.isInteger(message.startLine) && !(message.startLine && $util.isInteger(message.startLine.low) && $util.isInteger(message.startLine.high)))
                                return "startLine: integer|Long expected";
                        return null;
                    };

                    /**
                     * Creates a Function message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.Function} Function
                     */
                    Function.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.Function)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.Function: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.Function();
                        if (object.nameStrindex != null)
                            if ($Number(object.nameStrindex) !== 0)
                                message.nameStrindex = object.nameStrindex | 0;
                        if (object.systemNameStrindex != null)
                            if ($Number(object.systemNameStrindex) !== 0)
                                message.systemNameStrindex = object.systemNameStrindex | 0;
                        if (object.filenameStrindex != null)
                            if ($Number(object.filenameStrindex) !== 0)
                                message.filenameStrindex = object.filenameStrindex | 0;
                        if (object.startLine != null)
                            if (typeof object.startLine === "object" ? object.startLine.low || object.startLine.high : $Number(object.startLine) !== 0)
                                if ($util.Long)
                                    message.startLine = $util.Long.fromValue(object.startLine, false);
                                else if (typeof object.startLine === "string")
                                    message.startLine = $parseInt(object.startLine, 10);
                                else if (typeof object.startLine === "number")
                                    message.startLine = object.startLine;
                                else if (typeof object.startLine === "object")
                                    message.startLine = new $util.LongBits(object.startLine.low >>> 0, object.startLine.high >>> 0).toNumber();
                        return message;
                    };

                    /**
                     * Creates a plain object from a Function message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.Function} message Function
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Function.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.defaults) {
                            object.nameStrindex = 0;
                            object.systemNameStrindex = 0;
                            object.filenameStrindex = 0;
                            if ($util.Long) {
                                var long = new $util.Long(0, 0, false);
                                object.startLine = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                            } else
                                object.startLine = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                        }
                        if (message.nameStrindex != null && $Object.hasOwnProperty.call(message, "nameStrindex"))
                            object.nameStrindex = message.nameStrindex;
                        if (message.systemNameStrindex != null && $Object.hasOwnProperty.call(message, "systemNameStrindex"))
                            object.systemNameStrindex = message.systemNameStrindex;
                        if (message.filenameStrindex != null && $Object.hasOwnProperty.call(message, "filenameStrindex"))
                            object.filenameStrindex = message.filenameStrindex;
                        if (message.startLine != null && $Object.hasOwnProperty.call(message, "startLine"))
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.startLine = typeof message.startLine === "number" ? $BigInt(message.startLine) : $util.Long.fromBits(message.startLine.low >>> 0, message.startLine.high >>> 0, false).toBigInt();
                            else if (typeof message.startLine === "number")
                                object.startLine = options.longs === $String ? $String(message.startLine) : message.startLine;
                            else
                                object.startLine = options.longs === $String ? $util.Long.prototype.toString.call(message.startLine) : options.longs === $Number ? new $util.LongBits(message.startLine.low >>> 0, message.startLine.high >>> 0).toNumber() : message.startLine;
                        return object;
                    };

                    /**
                     * Converts this Function to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Function.prototype.toJSON = function() {
                        return Function.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Function
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.Function
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Function.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.Function";
                    };

                    return Function;
                })();

                v1development.KeyValueAndUnit = (function() {

                    /**
                     * Properties of a KeyValueAndUnit.
                     * @typedef {Object} opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties
                     * @property {number|null} [keyStrindex] KeyValueAndUnit keyStrindex
                     * @property {opentelemetry.proto.common.v1.AnyValue.$Properties|null} [value] KeyValueAndUnit value
                     * @property {number|null} [unitStrindex] KeyValueAndUnit unitStrindex
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a KeyValueAndUnit.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @interface IKeyValueAndUnit
                     * @augments opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties
                     * @deprecated Use opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties instead.
                     */

                    /**
                     * Shape of a KeyValueAndUnit.
                     * @typedef {{
                     *   keyStrindex?: number|null;
                     *   value?: opentelemetry.proto.common.v1.AnyValue.$Shape|null;
                     *   unitStrindex?: number|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape
                     */

                    /**
                     * Constructs a new KeyValueAndUnit.
                     * @memberof opentelemetry.proto.profiles.v1development
                     * @classdesc Represents a KeyValueAndUnit.
                     * @constructor
                     * @param {opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var KeyValueAndUnit = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * KeyValueAndUnit keyStrindex.
                     * @member {number} keyStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @instance
                     */
                    KeyValueAndUnit.prototype.keyStrindex = 0;

                    /**
                     * KeyValueAndUnit value.
                     * @member {opentelemetry.proto.common.v1.AnyValue.$Properties|null|undefined} value
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @instance
                     */
                    KeyValueAndUnit.prototype.value = null;

                    /**
                     * KeyValueAndUnit unitStrindex.
                     * @member {number} unitStrindex
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @instance
                     */
                    KeyValueAndUnit.prototype.unitStrindex = 0;

                    /**
                     * Creates a new KeyValueAndUnit instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.profiles.v1development.KeyValueAndUnit} KeyValueAndUnit instance
                     * @type {{
                     *   (properties: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape): opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape;
                     *   (properties?: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties): opentelemetry.proto.profiles.v1development.KeyValueAndUnit;
                     * }}
                     */
                    KeyValueAndUnit.create = function(properties) {
                        return new KeyValueAndUnit(properties);
                    };

                    /**
                     * Encodes the specified KeyValueAndUnit message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.KeyValueAndUnit.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties} message KeyValueAndUnit message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyValueAndUnit.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.keyStrindex != null && $Object.hasOwnProperty.call(message, "keyStrindex") && message.keyStrindex !== 0)
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.keyStrindex);
                        if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                            $root.opentelemetry.proto.common.v1.AnyValue.encode(message.value, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.unitStrindex != null && $Object.hasOwnProperty.call(message, "unitStrindex") && message.unitStrindex !== 0)
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.unitStrindex);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified KeyValueAndUnit message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.KeyValueAndUnit.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties} message KeyValueAndUnit message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyValueAndUnit.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a KeyValueAndUnit message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape} KeyValueAndUnit
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyValueAndUnit.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.keyStrindex = value;
                                    else
                                        delete message.keyStrindex;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    message.value = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32(), $undefined, _depth + 1, message.value);
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.unitStrindex = value;
                                    else
                                        delete message.unitStrindex;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a KeyValueAndUnit message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape} KeyValueAndUnit
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyValueAndUnit.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a KeyValueAndUnit message.
                     * @function verify
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    KeyValueAndUnit.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.keyStrindex != null && $Object.hasOwnProperty.call(message, "keyStrindex"))
                            if (!$util.isInteger(message.keyStrindex))
                                return "keyStrindex: integer expected";
                        if (message.value != null && $Object.hasOwnProperty.call(message, "value")) {
                            var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.value, _depth + 1);
                            if (error)
                                return "value." + error;
                        }
                        if (message.unitStrindex != null && $Object.hasOwnProperty.call(message, "unitStrindex"))
                            if (!$util.isInteger(message.unitStrindex))
                                return "unitStrindex: integer expected";
                        return null;
                    };

                    /**
                     * Creates a KeyValueAndUnit message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.profiles.v1development.KeyValueAndUnit} KeyValueAndUnit
                     */
                    KeyValueAndUnit.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.profiles.v1development.KeyValueAndUnit: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.profiles.v1development.KeyValueAndUnit();
                        if (object.keyStrindex != null)
                            if ($Number(object.keyStrindex) !== 0)
                                message.keyStrindex = object.keyStrindex | 0;
                        if (object.value != null) {
                            if (!$util.isObject(object.value))
                                throw $TypeError(".opentelemetry.proto.profiles.v1development.KeyValueAndUnit.value: object expected");
                            message.value = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.value, _depth + 1);
                        }
                        if (object.unitStrindex != null)
                            if ($Number(object.unitStrindex) !== 0)
                                message.unitStrindex = object.unitStrindex | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a KeyValueAndUnit message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {opentelemetry.proto.profiles.v1development.KeyValueAndUnit} message KeyValueAndUnit
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    KeyValueAndUnit.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.defaults) {
                            object.keyStrindex = 0;
                            object.value = null;
                            object.unitStrindex = 0;
                        }
                        if (message.keyStrindex != null && $Object.hasOwnProperty.call(message, "keyStrindex"))
                            object.keyStrindex = message.keyStrindex;
                        if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                            object.value = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.value, options, _depth + 1);
                        if (message.unitStrindex != null && $Object.hasOwnProperty.call(message, "unitStrindex"))
                            object.unitStrindex = message.unitStrindex;
                        return object;
                    };

                    /**
                     * Converts this KeyValueAndUnit to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    KeyValueAndUnit.prototype.toJSON = function() {
                        return KeyValueAndUnit.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for KeyValueAndUnit
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.profiles.v1development.KeyValueAndUnit
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    KeyValueAndUnit.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.profiles.v1development.KeyValueAndUnit";
                    };

                    return KeyValueAndUnit;
                })();

                return v1development;
            })();

            return profiles;
        })();

        proto.common = (function() {

            /**
             * Namespace common.
             * @memberof opentelemetry.proto
             * @namespace
             */
            var common = {};

            common.v1 = (function() {

                /**
                 * Namespace v1.
                 * @memberof opentelemetry.proto.common
                 * @namespace
                 */
                var v1 = {};

                v1.AnyValue = (function() {

                    /**
                     * Properties of an AnyValue.
                     * @typedef {Object} opentelemetry.proto.common.v1.AnyValue.$Properties
                     * @property {string|null} [stringValue] AnyValue stringValue
                     * @property {boolean|null} [boolValue] AnyValue boolValue
                     * @property {number|Long|null} [intValue] AnyValue intValue
                     * @property {number|null} [doubleValue] AnyValue doubleValue
                     * @property {opentelemetry.proto.common.v1.ArrayValue.$Properties|null} [arrayValue] AnyValue arrayValue
                     * @property {opentelemetry.proto.common.v1.KeyValueList.$Properties|null} [kvlistValue] AnyValue kvlistValue
                     * @property {Uint8Array|null} [bytesValue] AnyValue bytesValue
                     * @property {number|null} [stringValueStrindex] AnyValue stringValueStrindex
                     * @property {"stringValue"|"boolValue"|"intValue"|"doubleValue"|"arrayValue"|"kvlistValue"|"bytesValue"|"stringValueStrindex"} [value] AnyValue value
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of an AnyValue.
                     * @memberof opentelemetry.proto.common.v1
                     * @interface IAnyValue
                     * @augments opentelemetry.proto.common.v1.AnyValue.$Properties
                     * @deprecated Use opentelemetry.proto.common.v1.AnyValue.$Properties instead.
                     */

                    /**
                     * Narrowed shape of an AnyValue.
                     * @typedef {{
                     *   stringValue?: string|null;
                     *   boolValue?: boolean|null;
                     *   intValue?: number|Long|null;
                     *   doubleValue?: number|null;
                     *   arrayValue?: opentelemetry.proto.common.v1.ArrayValue.$Shape|null;
                     *   kvlistValue?: opentelemetry.proto.common.v1.KeyValueList.$Shape|null;
                     *   bytesValue?: Uint8Array|null;
                     *   stringValueStrindex?: number|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * } & (
                     *   ({ value?: undefined; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "stringValue"; stringValue: string; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "boolValue"; stringValue?: null; boolValue: boolean; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "intValue"; stringValue?: null; boolValue?: null; intValue: number|Long; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "doubleValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue: number; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "arrayValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue: opentelemetry.proto.common.v1.ArrayValue.$Shape; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "kvlistValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue: opentelemetry.proto.common.v1.KeyValueList.$Shape; bytesValue?: null; stringValueStrindex?: null }|{ value?: "bytesValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue: Uint8Array; stringValueStrindex?: null }|{ value?: "stringValueStrindex"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex: number })
                     * )} opentelemetry.proto.common.v1.AnyValue.$Shape
                     */

                    /**
                     * Constructs a new AnyValue.
                     * @memberof opentelemetry.proto.common.v1
                     * @classdesc Represents an AnyValue.
                     * @constructor
                     * @param {opentelemetry.proto.common.v1.AnyValue.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var AnyValue = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * AnyValue stringValue.
                     * @member {string|null|undefined} stringValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.stringValue = null;

                    /**
                     * AnyValue boolValue.
                     * @member {boolean|null|undefined} boolValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.boolValue = null;

                    /**
                     * AnyValue intValue.
                     * @member {number|Long|null|undefined} intValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.intValue = null;

                    /**
                     * AnyValue doubleValue.
                     * @member {number|null|undefined} doubleValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.doubleValue = null;

                    /**
                     * AnyValue arrayValue.
                     * @member {opentelemetry.proto.common.v1.ArrayValue.$Properties|null|undefined} arrayValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.arrayValue = null;

                    /**
                     * AnyValue kvlistValue.
                     * @member {opentelemetry.proto.common.v1.KeyValueList.$Properties|null|undefined} kvlistValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.kvlistValue = null;

                    /**
                     * AnyValue bytesValue.
                     * @member {Uint8Array|null|undefined} bytesValue
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.bytesValue = null;

                    /**
                     * AnyValue stringValueStrindex.
                     * @member {number|null|undefined} stringValueStrindex
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    AnyValue.prototype.stringValueStrindex = null;

                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;

                    /**
                     * AnyValue value.
                     * @member {"stringValue"|"boolValue"|"intValue"|"doubleValue"|"arrayValue"|"kvlistValue"|"bytesValue"|"stringValueStrindex"|undefined} value
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     */
                    $Object.defineProperty(AnyValue.prototype, "value", {
                        get: $util.oneOfGetter($oneOfFields = ["stringValue", "boolValue", "intValue", "doubleValue", "arrayValue", "kvlistValue", "bytesValue", "stringValueStrindex"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new AnyValue instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.AnyValue.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.common.v1.AnyValue} AnyValue instance
                     * @type {{
                     *   (properties: opentelemetry.proto.common.v1.AnyValue.$Shape): opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape;
                     *   (properties?: opentelemetry.proto.common.v1.AnyValue.$Properties): opentelemetry.proto.common.v1.AnyValue;
                     * }}
                     */
                    AnyValue.create = function(properties) {
                        return new AnyValue(properties);
                    };

                    /**
                     * Encodes the specified AnyValue message. Does not implicitly {@link opentelemetry.proto.common.v1.AnyValue.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.AnyValue.$Properties} message AnyValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AnyValue.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.stringValue != null && $Object.hasOwnProperty.call(message, "stringValue"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.stringValue);
                        if (message.boolValue != null && $Object.hasOwnProperty.call(message, "boolValue"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.boolValue);
                        if (message.intValue != null && $Object.hasOwnProperty.call(message, "intValue"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.intValue);
                        if (message.doubleValue != null && $Object.hasOwnProperty.call(message, "doubleValue"))
                            writer.uint32(/* id 4, wireType 1 =*/33).double(message.doubleValue);
                        if (message.arrayValue != null && $Object.hasOwnProperty.call(message, "arrayValue"))
                            $root.opentelemetry.proto.common.v1.ArrayValue.encode(message.arrayValue, writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
                        if (message.kvlistValue != null && $Object.hasOwnProperty.call(message, "kvlistValue"))
                            $root.opentelemetry.proto.common.v1.KeyValueList.encode(message.kvlistValue, writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
                        if (message.bytesValue != null && $Object.hasOwnProperty.call(message, "bytesValue"))
                            writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.bytesValue);
                        if (message.stringValueStrindex != null && $Object.hasOwnProperty.call(message, "stringValueStrindex"))
                            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.stringValueStrindex);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified AnyValue message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.AnyValue.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.AnyValue.$Properties} message AnyValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    AnyValue.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes an AnyValue message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape} AnyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AnyValue.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.common.v1.AnyValue();
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    message.stringValue = reader.stringVerify();
                                    message.value = "stringValue";
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    message.boolValue = reader.bool();
                                    message.value = "boolValue";
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    message.intValue = reader.int64();
                                    message.value = "intValue";
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 1)
                                        break;
                                    message.doubleValue = reader.double();
                                    message.value = "doubleValue";
                                    continue;
                                }
                            case 5: {
                                    if (wireType !== 2)
                                        break;
                                    message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.decode(reader, reader.uint32(), $undefined, _depth + 1, message.arrayValue);
                                    message.value = "arrayValue";
                                    continue;
                                }
                            case 6: {
                                    if (wireType !== 2)
                                        break;
                                    message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.decode(reader, reader.uint32(), $undefined, _depth + 1, message.kvlistValue);
                                    message.value = "kvlistValue";
                                    continue;
                                }
                            case 7: {
                                    if (wireType !== 2)
                                        break;
                                    message.bytesValue = reader.bytes();
                                    message.value = "bytesValue";
                                    continue;
                                }
                            case 8: {
                                    if (wireType !== 0)
                                        break;
                                    message.stringValueStrindex = reader.int32();
                                    message.value = "stringValueStrindex";
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes an AnyValue message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape} AnyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    AnyValue.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an AnyValue message.
                     * @function verify
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    AnyValue.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        var properties = {};
                        if (message.stringValue != null && $Object.hasOwnProperty.call(message, "stringValue")) {
                            properties.value = 1;
                            if (!$util.isString(message.stringValue))
                                return "stringValue: string expected";
                        }
                        if (message.boolValue != null && $Object.hasOwnProperty.call(message, "boolValue")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            if (typeof message.boolValue !== "boolean")
                                return "boolValue: boolean expected";
                        }
                        if (message.intValue != null && $Object.hasOwnProperty.call(message, "intValue")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                                return "intValue: integer|Long expected";
                        }
                        if (message.doubleValue != null && $Object.hasOwnProperty.call(message, "doubleValue")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            if (typeof message.doubleValue !== "number")
                                return "doubleValue: number expected";
                        }
                        if (message.arrayValue != null && $Object.hasOwnProperty.call(message, "arrayValue")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            {
                                var error = $root.opentelemetry.proto.common.v1.ArrayValue.verify(message.arrayValue, _depth + 1);
                                if (error)
                                    return "arrayValue." + error;
                            }
                        }
                        if (message.kvlistValue != null && $Object.hasOwnProperty.call(message, "kvlistValue")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            {
                                var error = $root.opentelemetry.proto.common.v1.KeyValueList.verify(message.kvlistValue, _depth + 1);
                                if (error)
                                    return "kvlistValue." + error;
                            }
                        }
                        if (message.bytesValue != null && $Object.hasOwnProperty.call(message, "bytesValue")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            if (!(message.bytesValue && typeof message.bytesValue.length === "number" || $util.isString(message.bytesValue)))
                                return "bytesValue: buffer expected";
                        }
                        if (message.stringValueStrindex != null && $Object.hasOwnProperty.call(message, "stringValueStrindex")) {
                            if (properties.value === 1)
                                return "value: multiple values";
                            properties.value = 1;
                            if (!$util.isInteger(message.stringValueStrindex))
                                return "stringValueStrindex: integer expected";
                        }
                        return null;
                    };

                    /**
                     * Creates an AnyValue message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.common.v1.AnyValue} AnyValue
                     */
                    AnyValue.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.common.v1.AnyValue)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.common.v1.AnyValue: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.common.v1.AnyValue();
                        if (object.stringValue != null)
                            message.stringValue = $String(object.stringValue);
                        if (object.boolValue != null)
                            message.boolValue = $Boolean(object.boolValue);
                        if (object.intValue != null)
                            if ($util.Long)
                                message.intValue = $util.Long.fromValue(object.intValue, false);
                            else if (typeof object.intValue === "string")
                                message.intValue = $parseInt(object.intValue, 10);
                            else if (typeof object.intValue === "number")
                                message.intValue = object.intValue;
                            else if (typeof object.intValue === "object")
                                message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                        if (object.doubleValue != null)
                            message.doubleValue = $Number(object.doubleValue);
                        if (object.arrayValue != null) {
                            if (!$util.isObject(object.arrayValue))
                                throw $TypeError(".opentelemetry.proto.common.v1.AnyValue.arrayValue: object expected");
                            message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.fromObject(object.arrayValue, _depth + 1);
                        }
                        if (object.kvlistValue != null) {
                            if (!$util.isObject(object.kvlistValue))
                                throw $TypeError(".opentelemetry.proto.common.v1.AnyValue.kvlistValue: object expected");
                            message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.fromObject(object.kvlistValue, _depth + 1);
                        }
                        if (object.bytesValue != null)
                            if (typeof object.bytesValue === "string")
                                $util.base64.decode(object.bytesValue, message.bytesValue = $util.newBuffer($util.base64.length(object.bytesValue)), 0);
                            else if (object.bytesValue.length >= 0)
                                message.bytesValue = object.bytesValue;
                        if (object.stringValueStrindex != null)
                            message.stringValueStrindex = object.stringValueStrindex | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from an AnyValue message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.AnyValue} message AnyValue
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    AnyValue.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (message.stringValue != null && $Object.hasOwnProperty.call(message, "stringValue")) {
                            object.stringValue = message.stringValue;
                            if (options.oneofs)
                                object.value = "stringValue";
                        }
                        if (message.boolValue != null && $Object.hasOwnProperty.call(message, "boolValue")) {
                            object.boolValue = message.boolValue;
                            if (options.oneofs)
                                object.value = "boolValue";
                        }
                        if (message.intValue != null && $Object.hasOwnProperty.call(message, "intValue")) {
                            if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                                object.intValue = typeof message.intValue === "number" ? $BigInt(message.intValue) : $util.Long.fromBits(message.intValue.low >>> 0, message.intValue.high >>> 0, false).toBigInt();
                            else if (typeof message.intValue === "number")
                                object.intValue = options.longs === $String ? $String(message.intValue) : message.intValue;
                            else
                                object.intValue = options.longs === $String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === $Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                            if (options.oneofs)
                                object.value = "intValue";
                        }
                        if (message.doubleValue != null && $Object.hasOwnProperty.call(message, "doubleValue")) {
                            object.doubleValue = options.json && !$isFinite(message.doubleValue) ? $String(message.doubleValue) : message.doubleValue;
                            if (options.oneofs)
                                object.value = "doubleValue";
                        }
                        if (message.arrayValue != null && $Object.hasOwnProperty.call(message, "arrayValue")) {
                            object.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.toObject(message.arrayValue, options, _depth + 1);
                            if (options.oneofs)
                                object.value = "arrayValue";
                        }
                        if (message.kvlistValue != null && $Object.hasOwnProperty.call(message, "kvlistValue")) {
                            object.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.toObject(message.kvlistValue, options, _depth + 1);
                            if (options.oneofs)
                                object.value = "kvlistValue";
                        }
                        if (message.bytesValue != null && $Object.hasOwnProperty.call(message, "bytesValue")) {
                            object.bytesValue = options.bytes === $String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                            if (options.oneofs)
                                object.value = "bytesValue";
                        }
                        if (message.stringValueStrindex != null && $Object.hasOwnProperty.call(message, "stringValueStrindex")) {
                            object.stringValueStrindex = message.stringValueStrindex;
                            if (options.oneofs)
                                object.value = "stringValueStrindex";
                        }
                        return object;
                    };

                    /**
                     * Converts this AnyValue to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    AnyValue.prototype.toJSON = function() {
                        return AnyValue.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for AnyValue
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.common.v1.AnyValue
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    AnyValue.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.common.v1.AnyValue";
                    };

                    return AnyValue;
                })();

                v1.ArrayValue = (function() {

                    /**
                     * Properties of an ArrayValue.
                     * @typedef {Object} opentelemetry.proto.common.v1.ArrayValue.$Properties
                     * @property {Array.<opentelemetry.proto.common.v1.AnyValue.$Properties>|null} [values] ArrayValue values
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of an ArrayValue.
                     * @memberof opentelemetry.proto.common.v1
                     * @interface IArrayValue
                     * @augments opentelemetry.proto.common.v1.ArrayValue.$Properties
                     * @deprecated Use opentelemetry.proto.common.v1.ArrayValue.$Properties instead.
                     */

                    /**
                     * Shape of an ArrayValue.
                     * @typedef {{
                     *   values?: Array.<opentelemetry.proto.common.v1.AnyValue.$Shape>|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.common.v1.ArrayValue.$Shape
                     */

                    /**
                     * Constructs a new ArrayValue.
                     * @memberof opentelemetry.proto.common.v1
                     * @classdesc Represents an ArrayValue.
                     * @constructor
                     * @param {opentelemetry.proto.common.v1.ArrayValue.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var ArrayValue = function (properties) {
                        this.values = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * ArrayValue values.
                     * @member {Array.<opentelemetry.proto.common.v1.AnyValue.$Properties>} values
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @instance
                     */
                    ArrayValue.prototype.values = $util.emptyArray;

                    /**
                     * Creates a new ArrayValue instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.ArrayValue.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.common.v1.ArrayValue} ArrayValue instance
                     * @type {{
                     *   (properties: opentelemetry.proto.common.v1.ArrayValue.$Shape): opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape;
                     *   (properties?: opentelemetry.proto.common.v1.ArrayValue.$Properties): opentelemetry.proto.common.v1.ArrayValue;
                     * }}
                     */
                    ArrayValue.create = function(properties) {
                        return new ArrayValue(properties);
                    };

                    /**
                     * Encodes the specified ArrayValue message. Does not implicitly {@link opentelemetry.proto.common.v1.ArrayValue.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.ArrayValue.$Properties} message ArrayValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ArrayValue.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.values != null && message.values.length)
                            for (var i = 0; i < message.values.length; ++i)
                                $root.opentelemetry.proto.common.v1.AnyValue.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ArrayValue message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.ArrayValue.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.ArrayValue.$Properties} message ArrayValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ArrayValue.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes an ArrayValue message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape} ArrayValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ArrayValue.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.common.v1.ArrayValue();
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.values && message.values.length))
                                        message.values = [];
                                    message.values.push($root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes an ArrayValue message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape} ArrayValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ArrayValue.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an ArrayValue message.
                     * @function verify
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ArrayValue.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.values != null && $Object.hasOwnProperty.call(message, "values")) {
                            if (!$Array.isArray(message.values))
                                return "values: array expected";
                            for (var i = 0; i < message.values.length; ++i) {
                                var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.values[i], _depth + 1);
                                if (error)
                                    return "values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates an ArrayValue message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.common.v1.ArrayValue} ArrayValue
                     */
                    ArrayValue.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.common.v1.ArrayValue)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.common.v1.ArrayValue: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                        if (object.values) {
                            if (!$Array.isArray(object.values))
                                throw $TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: array expected");
                            message.values = $Array(object.values.length);
                            for (var i = 0; i < object.values.length; ++i) {
                                if (!$util.isObject(object.values[i]))
                                    throw $TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: object expected");
                                message.values[i] = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.values[i], _depth + 1);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an ArrayValue message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.ArrayValue} message ArrayValue
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ArrayValue.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.values = [];
                        if (message.values && message.values.length) {
                            object.values = $Array(message.values.length);
                            for (var j = 0; j < message.values.length; ++j)
                                object.values[j] = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.values[j], options, _depth + 1);
                        }
                        return object;
                    };

                    /**
                     * Converts this ArrayValue to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ArrayValue.prototype.toJSON = function() {
                        return ArrayValue.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for ArrayValue
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.common.v1.ArrayValue
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    ArrayValue.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.common.v1.ArrayValue";
                    };

                    return ArrayValue;
                })();

                v1.KeyValueList = (function() {

                    /**
                     * Properties of a KeyValueList.
                     * @typedef {Object} opentelemetry.proto.common.v1.KeyValueList.$Properties
                     * @property {Array.<opentelemetry.proto.common.v1.KeyValue.$Properties>|null} [values] KeyValueList values
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a KeyValueList.
                     * @memberof opentelemetry.proto.common.v1
                     * @interface IKeyValueList
                     * @augments opentelemetry.proto.common.v1.KeyValueList.$Properties
                     * @deprecated Use opentelemetry.proto.common.v1.KeyValueList.$Properties instead.
                     */

                    /**
                     * Shape of a KeyValueList.
                     * @typedef {{
                     *   values?: Array.<opentelemetry.proto.common.v1.KeyValue.$Shape>|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.common.v1.KeyValueList.$Shape
                     */

                    /**
                     * Constructs a new KeyValueList.
                     * @memberof opentelemetry.proto.common.v1
                     * @classdesc Represents a KeyValueList.
                     * @constructor
                     * @param {opentelemetry.proto.common.v1.KeyValueList.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var KeyValueList = function (properties) {
                        this.values = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * KeyValueList values.
                     * @member {Array.<opentelemetry.proto.common.v1.KeyValue.$Properties>} values
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @instance
                     */
                    KeyValueList.prototype.values = $util.emptyArray;

                    /**
                     * Creates a new KeyValueList instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValueList.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.common.v1.KeyValueList} KeyValueList instance
                     * @type {{
                     *   (properties: opentelemetry.proto.common.v1.KeyValueList.$Shape): opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape;
                     *   (properties?: opentelemetry.proto.common.v1.KeyValueList.$Properties): opentelemetry.proto.common.v1.KeyValueList;
                     * }}
                     */
                    KeyValueList.create = function(properties) {
                        return new KeyValueList(properties);
                    };

                    /**
                     * Encodes the specified KeyValueList message. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValueList.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValueList.$Properties} message KeyValueList message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyValueList.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.values != null && message.values.length)
                            for (var i = 0; i < message.values.length; ++i)
                                $root.opentelemetry.proto.common.v1.KeyValue.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified KeyValueList message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValueList.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValueList.$Properties} message KeyValueList message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyValueList.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a KeyValueList message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape} KeyValueList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyValueList.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.common.v1.KeyValueList();
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.values && message.values.length))
                                        message.values = [];
                                    message.values.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a KeyValueList message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape} KeyValueList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyValueList.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a KeyValueList message.
                     * @function verify
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    KeyValueList.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.values != null && $Object.hasOwnProperty.call(message, "values")) {
                            if (!$Array.isArray(message.values))
                                return "values: array expected";
                            for (var i = 0; i < message.values.length; ++i) {
                                var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.values[i], _depth + 1);
                                if (error)
                                    return "values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a KeyValueList message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.common.v1.KeyValueList} KeyValueList
                     */
                    KeyValueList.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.common.v1.KeyValueList)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.common.v1.KeyValueList: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                        if (object.values) {
                            if (!$Array.isArray(object.values))
                                throw $TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: array expected");
                            message.values = $Array(object.values.length);
                            for (var i = 0; i < object.values.length; ++i) {
                                if (!$util.isObject(object.values[i]))
                                    throw $TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: object expected");
                                message.values[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.values[i], _depth + 1);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a KeyValueList message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValueList} message KeyValueList
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    KeyValueList.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.values = [];
                        if (message.values && message.values.length) {
                            object.values = $Array(message.values.length);
                            for (var j = 0; j < message.values.length; ++j)
                                object.values[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.values[j], options, _depth + 1);
                        }
                        return object;
                    };

                    /**
                     * Converts this KeyValueList to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    KeyValueList.prototype.toJSON = function() {
                        return KeyValueList.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for KeyValueList
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.common.v1.KeyValueList
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    KeyValueList.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.common.v1.KeyValueList";
                    };

                    return KeyValueList;
                })();

                v1.KeyValue = (function() {

                    /**
                     * Properties of a KeyValue.
                     * @typedef {Object} opentelemetry.proto.common.v1.KeyValue.$Properties
                     * @property {string|null} [key] KeyValue key
                     * @property {opentelemetry.proto.common.v1.AnyValue.$Properties|null} [value] KeyValue value
                     * @property {number|null} [keyStrindex] KeyValue keyStrindex
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a KeyValue.
                     * @memberof opentelemetry.proto.common.v1
                     * @interface IKeyValue
                     * @augments opentelemetry.proto.common.v1.KeyValue.$Properties
                     * @deprecated Use opentelemetry.proto.common.v1.KeyValue.$Properties instead.
                     */

                    /**
                     * Shape of a KeyValue.
                     * @typedef {{
                     *   key?: string|null;
                     *   value?: opentelemetry.proto.common.v1.AnyValue.$Shape|null;
                     *   keyStrindex?: number|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.common.v1.KeyValue.$Shape
                     */

                    /**
                     * Constructs a new KeyValue.
                     * @memberof opentelemetry.proto.common.v1
                     * @classdesc Represents a KeyValue.
                     * @constructor
                     * @param {opentelemetry.proto.common.v1.KeyValue.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var KeyValue = function (properties) {
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * KeyValue key.
                     * @member {string} key
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @instance
                     */
                    KeyValue.prototype.key = "";

                    /**
                     * KeyValue value.
                     * @member {opentelemetry.proto.common.v1.AnyValue.$Properties|null|undefined} value
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @instance
                     */
                    KeyValue.prototype.value = null;

                    /**
                     * KeyValue keyStrindex.
                     * @member {number} keyStrindex
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @instance
                     */
                    KeyValue.prototype.keyStrindex = 0;

                    /**
                     * Creates a new KeyValue instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValue.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.common.v1.KeyValue} KeyValue instance
                     * @type {{
                     *   (properties: opentelemetry.proto.common.v1.KeyValue.$Shape): opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape;
                     *   (properties?: opentelemetry.proto.common.v1.KeyValue.$Properties): opentelemetry.proto.common.v1.KeyValue;
                     * }}
                     */
                    KeyValue.create = function(properties) {
                        return new KeyValue(properties);
                    };

                    /**
                     * Encodes the specified KeyValue message. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValue.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValue.$Properties} message KeyValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyValue.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.key != null && $Object.hasOwnProperty.call(message, "key") && message.key !== "")
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                        if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                            $root.opentelemetry.proto.common.v1.AnyValue.encode(message.value, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
                        if (message.keyStrindex != null && $Object.hasOwnProperty.call(message, "keyStrindex") && message.keyStrindex !== 0)
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.keyStrindex);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified KeyValue message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValue.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValue.$Properties} message KeyValue message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    KeyValue.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a KeyValue message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape} KeyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyValue.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.common.v1.KeyValue(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.key = value;
                                    else
                                        delete message.key;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    message.value = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32(), $undefined, _depth + 1, message.value);
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.int32())
                                        message.keyStrindex = value;
                                    else
                                        delete message.keyStrindex;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a KeyValue message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape} KeyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    KeyValue.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a KeyValue message.
                     * @function verify
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    KeyValue.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.key != null && $Object.hasOwnProperty.call(message, "key"))
                            if (!$util.isString(message.key))
                                return "key: string expected";
                        if (message.value != null && $Object.hasOwnProperty.call(message, "value")) {
                            var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.value, _depth + 1);
                            if (error)
                                return "value." + error;
                        }
                        if (message.keyStrindex != null && $Object.hasOwnProperty.call(message, "keyStrindex"))
                            if (!$util.isInteger(message.keyStrindex))
                                return "keyStrindex: integer expected";
                        return null;
                    };

                    /**
                     * Creates a KeyValue message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.common.v1.KeyValue} KeyValue
                     */
                    KeyValue.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.common.v1.KeyValue)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.common.v1.KeyValue: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.common.v1.KeyValue();
                        if (object.key != null)
                            if (typeof object.key !== "string" || object.key.length)
                                message.key = $String(object.key);
                        if (object.value != null) {
                            if (!$util.isObject(object.value))
                                throw $TypeError(".opentelemetry.proto.common.v1.KeyValue.value: object expected");
                            message.value = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.value, _depth + 1);
                        }
                        if (object.keyStrindex != null)
                            if ($Number(object.keyStrindex) !== 0)
                                message.keyStrindex = object.keyStrindex | 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a KeyValue message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {opentelemetry.proto.common.v1.KeyValue} message KeyValue
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    KeyValue.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.defaults) {
                            object.key = "";
                            object.value = null;
                            object.keyStrindex = 0;
                        }
                        if (message.key != null && $Object.hasOwnProperty.call(message, "key"))
                            object.key = message.key;
                        if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                            object.value = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.value, options, _depth + 1);
                        if (message.keyStrindex != null && $Object.hasOwnProperty.call(message, "keyStrindex"))
                            object.keyStrindex = message.keyStrindex;
                        return object;
                    };

                    /**
                     * Converts this KeyValue to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    KeyValue.prototype.toJSON = function() {
                        return KeyValue.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for KeyValue
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.common.v1.KeyValue
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    KeyValue.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.common.v1.KeyValue";
                    };

                    return KeyValue;
                })();

                v1.InstrumentationScope = (function() {

                    /**
                     * Properties of an InstrumentationScope.
                     * @typedef {Object} opentelemetry.proto.common.v1.InstrumentationScope.$Properties
                     * @property {string|null} [name] InstrumentationScope name
                     * @property {string|null} [version] InstrumentationScope version
                     * @property {Array.<opentelemetry.proto.common.v1.KeyValue.$Properties>|null} [attributes] InstrumentationScope attributes
                     * @property {number|null} [droppedAttributesCount] InstrumentationScope droppedAttributesCount
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of an InstrumentationScope.
                     * @memberof opentelemetry.proto.common.v1
                     * @interface IInstrumentationScope
                     * @augments opentelemetry.proto.common.v1.InstrumentationScope.$Properties
                     * @deprecated Use opentelemetry.proto.common.v1.InstrumentationScope.$Properties instead.
                     */

                    /**
                     * Shape of an InstrumentationScope.
                     * @typedef {{
                     *   name?: string|null;
                     *   version?: string|null;
                     *   attributes?: Array.<opentelemetry.proto.common.v1.KeyValue.$Shape>|null;
                     *   droppedAttributesCount?: number|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.common.v1.InstrumentationScope.$Shape
                     */

                    /**
                     * Constructs a new InstrumentationScope.
                     * @memberof opentelemetry.proto.common.v1
                     * @classdesc Represents an InstrumentationScope.
                     * @constructor
                     * @param {opentelemetry.proto.common.v1.InstrumentationScope.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var InstrumentationScope = function (properties) {
                        this.attributes = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * InstrumentationScope name.
                     * @member {string} name
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @instance
                     */
                    InstrumentationScope.prototype.name = "";

                    /**
                     * InstrumentationScope version.
                     * @member {string} version
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @instance
                     */
                    InstrumentationScope.prototype.version = "";

                    /**
                     * InstrumentationScope attributes.
                     * @member {Array.<opentelemetry.proto.common.v1.KeyValue.$Properties>} attributes
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @instance
                     */
                    InstrumentationScope.prototype.attributes = $util.emptyArray;

                    /**
                     * InstrumentationScope droppedAttributesCount.
                     * @member {number} droppedAttributesCount
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @instance
                     */
                    InstrumentationScope.prototype.droppedAttributesCount = 0;

                    /**
                     * Creates a new InstrumentationScope instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {opentelemetry.proto.common.v1.InstrumentationScope.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.common.v1.InstrumentationScope} InstrumentationScope instance
                     * @type {{
                     *   (properties: opentelemetry.proto.common.v1.InstrumentationScope.$Shape): opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape;
                     *   (properties?: opentelemetry.proto.common.v1.InstrumentationScope.$Properties): opentelemetry.proto.common.v1.InstrumentationScope;
                     * }}
                     */
                    InstrumentationScope.create = function(properties) {
                        return new InstrumentationScope(properties);
                    };

                    /**
                     * Encodes the specified InstrumentationScope message. Does not implicitly {@link opentelemetry.proto.common.v1.InstrumentationScope.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {opentelemetry.proto.common.v1.InstrumentationScope.$Properties} message InstrumentationScope message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    InstrumentationScope.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                        if (message.version != null && $Object.hasOwnProperty.call(message, "version") && message.version !== "")
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
                        if (message.attributes != null && message.attributes.length)
                            for (var i = 0; i < message.attributes.length; ++i)
                                $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount") && message.droppedAttributesCount !== 0)
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.droppedAttributesCount);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified InstrumentationScope message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.InstrumentationScope.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {opentelemetry.proto.common.v1.InstrumentationScope.$Properties} message InstrumentationScope message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    InstrumentationScope.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes an InstrumentationScope message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape} InstrumentationScope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    InstrumentationScope.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.common.v1.InstrumentationScope(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.name = value;
                                    else
                                        delete message.name;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.version = value;
                                    else
                                        delete message.version;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.attributes && message.attributes.length))
                                        message.attributes = [];
                                    message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.uint32())
                                        message.droppedAttributesCount = value;
                                    else
                                        delete message.droppedAttributesCount;
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes an InstrumentationScope message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape} InstrumentationScope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    InstrumentationScope.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an InstrumentationScope message.
                     * @function verify
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    InstrumentationScope.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                            if (!$util.isString(message.name))
                                return "name: string expected";
                        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                            if (!$util.isString(message.version))
                                return "version: string expected";
                        if (message.attributes != null && $Object.hasOwnProperty.call(message, "attributes")) {
                            if (!$Array.isArray(message.attributes))
                                return "attributes: array expected";
                            for (var i = 0; i < message.attributes.length; ++i) {
                                var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i], _depth + 1);
                                if (error)
                                    return "attributes." + error;
                            }
                        }
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                            if (!$util.isInteger(message.droppedAttributesCount))
                                return "droppedAttributesCount: integer expected";
                        return null;
                    };

                    /**
                     * Creates an InstrumentationScope message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.common.v1.InstrumentationScope} InstrumentationScope
                     */
                    InstrumentationScope.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.common.v1.InstrumentationScope)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.common.v1.InstrumentationScope: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                        if (object.name != null)
                            if (typeof object.name !== "string" || object.name.length)
                                message.name = $String(object.name);
                        if (object.version != null)
                            if (typeof object.version !== "string" || object.version.length)
                                message.version = $String(object.version);
                        if (object.attributes) {
                            if (!$Array.isArray(object.attributes))
                                throw $TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: array expected");
                            message.attributes = $Array(object.attributes.length);
                            for (var i = 0; i < object.attributes.length; ++i) {
                                if (!$util.isObject(object.attributes[i]))
                                    throw $TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: object expected");
                                message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i], _depth + 1);
                            }
                        }
                        if (object.droppedAttributesCount != null)
                            if ($Number(object.droppedAttributesCount) !== 0)
                                message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from an InstrumentationScope message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {opentelemetry.proto.common.v1.InstrumentationScope} message InstrumentationScope
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    InstrumentationScope.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.attributes = [];
                        if (options.defaults) {
                            object.name = "";
                            object.version = "";
                            object.droppedAttributesCount = 0;
                        }
                        if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                            object.name = message.name;
                        if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                            object.version = message.version;
                        if (message.attributes && message.attributes.length) {
                            object.attributes = $Array(message.attributes.length);
                            for (var j = 0; j < message.attributes.length; ++j)
                                object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options, _depth + 1);
                        }
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                            object.droppedAttributesCount = message.droppedAttributesCount;
                        return object;
                    };

                    /**
                     * Converts this InstrumentationScope to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    InstrumentationScope.prototype.toJSON = function() {
                        return InstrumentationScope.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for InstrumentationScope
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.common.v1.InstrumentationScope
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    InstrumentationScope.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.common.v1.InstrumentationScope";
                    };

                    return InstrumentationScope;
                })();

                v1.EntityRef = (function() {

                    /**
                     * Properties of an EntityRef.
                     * @typedef {Object} opentelemetry.proto.common.v1.EntityRef.$Properties
                     * @property {string|null} [schemaUrl] EntityRef schemaUrl
                     * @property {string|null} [type] EntityRef type
                     * @property {Array.<string>|null} [idKeys] EntityRef idKeys
                     * @property {Array.<string>|null} [descriptionKeys] EntityRef descriptionKeys
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of an EntityRef.
                     * @memberof opentelemetry.proto.common.v1
                     * @interface IEntityRef
                     * @augments opentelemetry.proto.common.v1.EntityRef.$Properties
                     * @deprecated Use opentelemetry.proto.common.v1.EntityRef.$Properties instead.
                     */

                    /**
                     * Shape of an EntityRef.
                     * @typedef {opentelemetry.proto.common.v1.EntityRef.$Properties} opentelemetry.proto.common.v1.EntityRef.$Shape
                     */

                    /**
                     * Constructs a new EntityRef.
                     * @memberof opentelemetry.proto.common.v1
                     * @classdesc Represents an EntityRef.
                     * @constructor
                     * @param {opentelemetry.proto.common.v1.EntityRef.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var EntityRef = function (properties) {
                        this.idKeys = [];
                        this.descriptionKeys = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * EntityRef schemaUrl.
                     * @member {string} schemaUrl
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @instance
                     */
                    EntityRef.prototype.schemaUrl = "";

                    /**
                     * EntityRef type.
                     * @member {string} type
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @instance
                     */
                    EntityRef.prototype.type = "";

                    /**
                     * EntityRef idKeys.
                     * @member {Array.<string>} idKeys
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @instance
                     */
                    EntityRef.prototype.idKeys = $util.emptyArray;

                    /**
                     * EntityRef descriptionKeys.
                     * @member {Array.<string>} descriptionKeys
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @instance
                     */
                    EntityRef.prototype.descriptionKeys = $util.emptyArray;

                    /**
                     * Creates a new EntityRef instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {opentelemetry.proto.common.v1.EntityRef.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.common.v1.EntityRef} EntityRef instance
                     * @type {{
                     *   (properties: opentelemetry.proto.common.v1.EntityRef.$Shape): opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape;
                     *   (properties?: opentelemetry.proto.common.v1.EntityRef.$Properties): opentelemetry.proto.common.v1.EntityRef;
                     * }}
                     */
                    EntityRef.create = function(properties) {
                        return new EntityRef(properties);
                    };

                    /**
                     * Encodes the specified EntityRef message. Does not implicitly {@link opentelemetry.proto.common.v1.EntityRef.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {opentelemetry.proto.common.v1.EntityRef.$Properties} message EntityRef message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntityRef.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl") && message.schemaUrl !== "")
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.schemaUrl);
                        if (message.type != null && $Object.hasOwnProperty.call(message, "type") && message.type !== "")
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
                        if (message.idKeys != null && message.idKeys.length)
                            for (var i = 0; i < message.idKeys.length; ++i)
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.idKeys[i]);
                        if (message.descriptionKeys != null && message.descriptionKeys.length)
                            for (var i = 0; i < message.descriptionKeys.length; ++i)
                                writer.uint32(/* id 4, wireType 2 =*/34).string(message.descriptionKeys[i]);
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified EntityRef message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.EntityRef.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {opentelemetry.proto.common.v1.EntityRef.$Properties} message EntityRef message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    EntityRef.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes an EntityRef message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape} EntityRef
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntityRef.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.common.v1.EntityRef(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.schemaUrl = value;
                                    else
                                        delete message.schemaUrl;
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 2)
                                        break;
                                    if ((value = reader.stringVerify()).length)
                                        message.type = value;
                                    else
                                        delete message.type;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.idKeys && message.idKeys.length))
                                        message.idKeys = [];
                                    message.idKeys.push(reader.stringVerify());
                                    continue;
                                }
                            case 4: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.descriptionKeys && message.descriptionKeys.length))
                                        message.descriptionKeys = [];
                                    message.descriptionKeys.push(reader.stringVerify());
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes an EntityRef message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape} EntityRef
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    EntityRef.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an EntityRef message.
                     * @function verify
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    EntityRef.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl"))
                            if (!$util.isString(message.schemaUrl))
                                return "schemaUrl: string expected";
                        if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                            if (!$util.isString(message.type))
                                return "type: string expected";
                        if (message.idKeys != null && $Object.hasOwnProperty.call(message, "idKeys")) {
                            if (!$Array.isArray(message.idKeys))
                                return "idKeys: array expected";
                            for (var i = 0; i < message.idKeys.length; ++i)
                                if (!$util.isString(message.idKeys[i]))
                                    return "idKeys: string[] expected";
                        }
                        if (message.descriptionKeys != null && $Object.hasOwnProperty.call(message, "descriptionKeys")) {
                            if (!$Array.isArray(message.descriptionKeys))
                                return "descriptionKeys: array expected";
                            for (var i = 0; i < message.descriptionKeys.length; ++i)
                                if (!$util.isString(message.descriptionKeys[i]))
                                    return "descriptionKeys: string[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates an EntityRef message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.common.v1.EntityRef} EntityRef
                     */
                    EntityRef.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.common.v1.EntityRef)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.common.v1.EntityRef: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.common.v1.EntityRef();
                        if (object.schemaUrl != null)
                            if (typeof object.schemaUrl !== "string" || object.schemaUrl.length)
                                message.schemaUrl = $String(object.schemaUrl);
                        if (object.type != null)
                            if (typeof object.type !== "string" || object.type.length)
                                message.type = $String(object.type);
                        if (object.idKeys) {
                            if (!$Array.isArray(object.idKeys))
                                throw $TypeError(".opentelemetry.proto.common.v1.EntityRef.idKeys: array expected");
                            message.idKeys = $Array(object.idKeys.length);
                            for (var i = 0; i < object.idKeys.length; ++i)
                                message.idKeys[i] = $String(object.idKeys[i]);
                        }
                        if (object.descriptionKeys) {
                            if (!$Array.isArray(object.descriptionKeys))
                                throw $TypeError(".opentelemetry.proto.common.v1.EntityRef.descriptionKeys: array expected");
                            message.descriptionKeys = $Array(object.descriptionKeys.length);
                            for (var i = 0; i < object.descriptionKeys.length; ++i)
                                message.descriptionKeys[i] = $String(object.descriptionKeys[i]);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an EntityRef message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {opentelemetry.proto.common.v1.EntityRef} message EntityRef
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    EntityRef.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.idKeys = [];
                            object.descriptionKeys = [];
                        }
                        if (options.defaults) {
                            object.schemaUrl = "";
                            object.type = "";
                        }
                        if (message.schemaUrl != null && $Object.hasOwnProperty.call(message, "schemaUrl"))
                            object.schemaUrl = message.schemaUrl;
                        if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                            object.type = message.type;
                        if (message.idKeys && message.idKeys.length) {
                            object.idKeys = $Array(message.idKeys.length);
                            for (var j = 0; j < message.idKeys.length; ++j)
                                object.idKeys[j] = message.idKeys[j];
                        }
                        if (message.descriptionKeys && message.descriptionKeys.length) {
                            object.descriptionKeys = $Array(message.descriptionKeys.length);
                            for (var j = 0; j < message.descriptionKeys.length; ++j)
                                object.descriptionKeys[j] = message.descriptionKeys[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this EntityRef to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    EntityRef.prototype.toJSON = function() {
                        return EntityRef.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for EntityRef
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.common.v1.EntityRef
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    EntityRef.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.common.v1.EntityRef";
                    };

                    return EntityRef;
                })();

                return v1;
            })();

            return common;
        })();

        proto.resource = (function() {

            /**
             * Namespace resource.
             * @memberof opentelemetry.proto
             * @namespace
             */
            var resource = {};

            resource.v1 = (function() {

                /**
                 * Namespace v1.
                 * @memberof opentelemetry.proto.resource
                 * @namespace
                 */
                var v1 = {};

                v1.Resource = (function() {

                    /**
                     * Properties of a Resource.
                     * @typedef {Object} opentelemetry.proto.resource.v1.Resource.$Properties
                     * @property {Array.<opentelemetry.proto.common.v1.KeyValue.$Properties>|null} [attributes] Resource attributes
                     * @property {number|null} [droppedAttributesCount] Resource droppedAttributesCount
                     * @property {Array.<opentelemetry.proto.common.v1.EntityRef.$Properties>|null} [entityRefs] Resource entityRefs
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */

                    /**
                     * Properties of a Resource.
                     * @memberof opentelemetry.proto.resource.v1
                     * @interface IResource
                     * @augments opentelemetry.proto.resource.v1.Resource.$Properties
                     * @deprecated Use opentelemetry.proto.resource.v1.Resource.$Properties instead.
                     */

                    /**
                     * Shape of a Resource.
                     * @typedef {{
                     *   attributes?: Array.<opentelemetry.proto.common.v1.KeyValue.$Shape>|null;
                     *   droppedAttributesCount?: number|null;
                     *   entityRefs?: Array.<opentelemetry.proto.common.v1.EntityRef.$Shape>|null;
                     *   $unknowns?: Array.<Uint8Array>;
                     * }} opentelemetry.proto.resource.v1.Resource.$Shape
                     */

                    /**
                     * Constructs a new Resource.
                     * @memberof opentelemetry.proto.resource.v1
                     * @classdesc Represents a Resource.
                     * @constructor
                     * @param {opentelemetry.proto.resource.v1.Resource.$Properties=} [properties] Properties to set
                     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
                     */
                    var Resource = function (properties) {
                        this.attributes = [];
                        this.entityRefs = [];
                        if (properties)
                            for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    };

                    /**
                     * Resource attributes.
                     * @member {Array.<opentelemetry.proto.common.v1.KeyValue.$Properties>} attributes
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @instance
                     */
                    Resource.prototype.attributes = $util.emptyArray;

                    /**
                     * Resource droppedAttributesCount.
                     * @member {number} droppedAttributesCount
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @instance
                     */
                    Resource.prototype.droppedAttributesCount = 0;

                    /**
                     * Resource entityRefs.
                     * @member {Array.<opentelemetry.proto.common.v1.EntityRef.$Properties>} entityRefs
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @instance
                     */
                    Resource.prototype.entityRefs = $util.emptyArray;

                    /**
                     * Creates a new Resource instance using the specified properties.
                     * @function create
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {opentelemetry.proto.resource.v1.Resource.$Properties=} [properties] Properties to set
                     * @returns {opentelemetry.proto.resource.v1.Resource} Resource instance
                     * @type {{
                     *   (properties: opentelemetry.proto.resource.v1.Resource.$Shape): opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape;
                     *   (properties?: opentelemetry.proto.resource.v1.Resource.$Properties): opentelemetry.proto.resource.v1.Resource;
                     * }}
                     */
                    Resource.create = function(properties) {
                        return new Resource(properties);
                    };

                    /**
                     * Encodes the specified Resource message. Does not implicitly {@link opentelemetry.proto.resource.v1.Resource.verify|verify} messages.
                     * @function encode
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {opentelemetry.proto.resource.v1.Resource.$Properties} message Resource message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Resource.encode = function (message, writer, _depth) {
                        if (!writer)
                            writer = $Writer.create();
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        if (message.attributes != null && message.attributes.length)
                            for (var i = 0; i < message.attributes.length; ++i)
                                $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount") && message.droppedAttributesCount !== 0)
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.droppedAttributesCount);
                        if (message.entityRefs != null && message.entityRefs.length)
                            for (var i = 0; i < message.entityRefs.length; ++i)
                                $root.opentelemetry.proto.common.v1.EntityRef.encode(message.entityRefs[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
                        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                            for (var i = 0; i < message.$unknowns.length; ++i)
                                writer.raw(message.$unknowns[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Resource message, length delimited. Does not implicitly {@link opentelemetry.proto.resource.v1.Resource.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {opentelemetry.proto.resource.v1.Resource.$Properties} message Resource message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Resource.encodeDelimited = function(message, writer) {
                        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
                    };

                    /**
                     * Decodes a Resource message from the specified reader or buffer.
                     * @function decode
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape} Resource
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Resource.decode = function (reader, length, _end, _depth, _target) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $Reader.recursionLimit)
                            throw $Error("max depth exceeded");
                        var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.opentelemetry.proto.resource.v1.Resource(), value;
                        while (reader.pos < end) {
                            var start = reader.pos;
                            var tag = reader.tag();
                            if (tag === _end) {
                                _end = $undefined;
                                break;
                            }
                            var wireType = tag & 7;
                            switch (tag >>>= 3) {
                            case 1: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.attributes && message.attributes.length))
                                        message.attributes = [];
                                    message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            case 2: {
                                    if (wireType !== 0)
                                        break;
                                    if (value = reader.uint32())
                                        message.droppedAttributesCount = value;
                                    else
                                        delete message.droppedAttributesCount;
                                    continue;
                                }
                            case 3: {
                                    if (wireType !== 2)
                                        break;
                                    if (!(message.entityRefs && message.entityRefs.length))
                                        message.entityRefs = [];
                                    message.entityRefs.push($root.opentelemetry.proto.common.v1.EntityRef.decode(reader, reader.uint32(), $undefined, _depth + 1));
                                    continue;
                                }
                            }
                            reader.skipType(wireType, _depth, tag);
                            if (!reader.discardUnknown) {
                                $util.makeProp(message, "$unknowns", false);
                                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                            }
                        }
                        if (_end !== $undefined)
                            throw $Error("missing end group");
                        return message;
                    };

                    /**
                     * Decodes a Resource message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape} Resource
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Resource.decodeDelimited = function(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Resource message.
                     * @function verify
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Resource.verify = function (message, _depth) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            return "max depth exceeded";
                        if (message.attributes != null && $Object.hasOwnProperty.call(message, "attributes")) {
                            if (!$Array.isArray(message.attributes))
                                return "attributes: array expected";
                            for (var i = 0; i < message.attributes.length; ++i) {
                                var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i], _depth + 1);
                                if (error)
                                    return "attributes." + error;
                            }
                        }
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                            if (!$util.isInteger(message.droppedAttributesCount))
                                return "droppedAttributesCount: integer expected";
                        if (message.entityRefs != null && $Object.hasOwnProperty.call(message, "entityRefs")) {
                            if (!$Array.isArray(message.entityRefs))
                                return "entityRefs: array expected";
                            for (var i = 0; i < message.entityRefs.length; ++i) {
                                var error = $root.opentelemetry.proto.common.v1.EntityRef.verify(message.entityRefs[i], _depth + 1);
                                if (error)
                                    return "entityRefs." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Resource message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {opentelemetry.proto.resource.v1.Resource} Resource
                     */
                    Resource.fromObject = function (object, _depth) {
                        if (object instanceof $root.opentelemetry.proto.resource.v1.Resource)
                            return object;
                        if (!$util.isObject(object))
                            throw $TypeError(".opentelemetry.proto.resource.v1.Resource: object expected");
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var message = new $root.opentelemetry.proto.resource.v1.Resource();
                        if (object.attributes) {
                            if (!$Array.isArray(object.attributes))
                                throw $TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: array expected");
                            message.attributes = $Array(object.attributes.length);
                            for (var i = 0; i < object.attributes.length; ++i) {
                                if (!$util.isObject(object.attributes[i]))
                                    throw $TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: object expected");
                                message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i], _depth + 1);
                            }
                        }
                        if (object.droppedAttributesCount != null)
                            if ($Number(object.droppedAttributesCount) !== 0)
                                message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                        if (object.entityRefs) {
                            if (!$Array.isArray(object.entityRefs))
                                throw $TypeError(".opentelemetry.proto.resource.v1.Resource.entityRefs: array expected");
                            message.entityRefs = $Array(object.entityRefs.length);
                            for (var i = 0; i < object.entityRefs.length; ++i) {
                                if (!$util.isObject(object.entityRefs[i]))
                                    throw $TypeError(".opentelemetry.proto.resource.v1.Resource.entityRefs: object expected");
                                message.entityRefs[i] = $root.opentelemetry.proto.common.v1.EntityRef.fromObject(object.entityRefs[i], _depth + 1);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Resource message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {opentelemetry.proto.resource.v1.Resource} message Resource
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Resource.toObject = function (message, options, _depth) {
                        if (!options)
                            options = {};
                        if (_depth === $undefined)
                            _depth = 0;
                        if (_depth > $util.recursionLimit)
                            throw $Error("max depth exceeded");
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.attributes = [];
                            object.entityRefs = [];
                        }
                        if (options.defaults)
                            object.droppedAttributesCount = 0;
                        if (message.attributes && message.attributes.length) {
                            object.attributes = $Array(message.attributes.length);
                            for (var j = 0; j < message.attributes.length; ++j)
                                object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options, _depth + 1);
                        }
                        if (message.droppedAttributesCount != null && $Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                            object.droppedAttributesCount = message.droppedAttributesCount;
                        if (message.entityRefs && message.entityRefs.length) {
                            object.entityRefs = $Array(message.entityRefs.length);
                            for (var j = 0; j < message.entityRefs.length; ++j)
                                object.entityRefs[j] = $root.opentelemetry.proto.common.v1.EntityRef.toObject(message.entityRefs[j], options, _depth + 1);
                        }
                        return object;
                    };

                    /**
                     * Converts this Resource to JSON.
                     * @function toJSON
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Resource.prototype.toJSON = function() {
                        return Resource.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the type url for Resource
                     * @function getTypeUrl
                     * @memberof opentelemetry.proto.resource.v1.Resource
                     * @static
                     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns {string} The type url
                     */
                    Resource.getTypeUrl = function(prefix) {
                        if (prefix === $undefined)
                            prefix = "type.googleapis.com";
                        return prefix + "/opentelemetry.proto.resource.v1.Resource";
                    };

                    return Resource;
                })();

                return v1;
            })();

            return resource;
        })();

        return proto;
    })();

    return opentelemetry;
})();

module.exports = $root;
