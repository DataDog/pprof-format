import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace opentelemetry. */
export namespace opentelemetry {

    /** Namespace proto. */
    namespace proto {

        /** Namespace collector. */
        namespace collector {

            /** Namespace profiles. */
            namespace profiles {

                /** Namespace v1development. */
                namespace v1development {

                    /** Represents a ProfilesService */
                    class ProfilesService extends $protobuf.rpc.Service {

                        /**
                         * Constructs a new ProfilesService service.
                         * @param rpcImpl RPC implementation
                         * @param [requestDelimited=false] Whether requests are length-delimited
                         * @param [responseDelimited=false] Whether responses are length-delimited
                         */
                        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                        /**
                         * Creates new ProfilesService service using the specified rpc implementation.
                         * @param rpcImpl RPC implementation
                         * @param [requestDelimited=false] Whether requests are length-delimited
                         * @param [responseDelimited=false] Whether responses are length-delimited
                         * @returns RPC service. Useful where requests and/or responses are streamed.
                         */
                        static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ProfilesService;

                        /** Calls Export. */
                        export: opentelemetry.proto.collector.profiles.v1development.ProfilesService.Export;
                    }

                    namespace ProfilesService {

                        /**
                         * Callback as used by {@link opentelemetry.proto.collector.profiles.v1development.ProfilesService#export_}.
                         * @param error Error, if any
                         * @param [response] ExportProfilesServiceResponse
                         */
                        type ExportCallback = (error: (Error|null), response?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse) => void;

                        /** Calls Export. */
                        type Export = {
                          (request: opentelemetry.proto.collector.profiles.v1development.IExportProfilesServiceRequest, callback: opentelemetry.proto.collector.profiles.v1development.ProfilesService.ExportCallback): void;
                          (request: opentelemetry.proto.collector.profiles.v1development.IExportProfilesServiceRequest): Promise<opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse>;
                          readonly name: "Export";
                          readonly path: "/opentelemetry.proto.collector.profiles.v1development.ProfilesService/Export";
                          readonly requestType: "ExportProfilesServiceRequest";
                          readonly responseType: "ExportProfilesServiceResponse";
                          readonly requestStream: undefined;
                          readonly responseStream: undefined;
                        };
                    }

                    /**
                     * Properties of an ExportProfilesServiceRequest.
                     * @deprecated Use opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties instead.
                     */
                    interface IExportProfilesServiceRequest extends opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties {
                    }

                    /** Represents an ExportProfilesServiceRequest. */
                    class ExportProfilesServiceRequest {

                        /**
                         * Constructs a new ExportProfilesServiceRequest.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];

                        /** ExportProfilesServiceRequest resourceProfiles. */
                        resourceProfiles: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties[];

                        /** ExportProfilesServiceRequest dictionary. */
                        dictionary?: (opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null);

                        /**
                         * Creates a new ExportProfilesServiceRequest instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ExportProfilesServiceRequest instance
                         */
                        static create(properties: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape;
                        static create(properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest;

                        /**
                         * Encodes the specified ExportProfilesServiceRequest message. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.verify|verify} messages.
                         * @param message ExportProfilesServiceRequest message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        static encode(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ExportProfilesServiceRequest message, length delimited. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.verify|verify} messages.
                         * @param message ExportProfilesServiceRequest message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        static encodeDelimited(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an ExportProfilesServiceRequest message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape} ExportProfilesServiceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape;

                        /**
                         * Decodes an ExportProfilesServiceRequest message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape} ExportProfilesServiceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest.$Shape;

                        /**
                         * Verifies an ExportProfilesServiceRequest message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an ExportProfilesServiceRequest message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ExportProfilesServiceRequest
                         */
                        static fromObject(object: { [k: string]: any }): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest;

                        /**
                         * Creates a plain object from an ExportProfilesServiceRequest message. Also converts values to other types if specified.
                         * @param message ExportProfilesServiceRequest
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        static toObject(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ExportProfilesServiceRequest to JSON.
                         * @returns JSON object
                         */
                        toJSON(): { [k: string]: any };

                        /**
                         * Gets the type url for ExportProfilesServiceRequest
                         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                         * @returns The type url
                         */
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace ExportProfilesServiceRequest {

                        /** Properties of an ExportProfilesServiceRequest. */
                        interface $Properties {

                            /** ExportProfilesServiceRequest resourceProfiles */
                            resourceProfiles?: (opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties[]|null);

                            /** ExportProfilesServiceRequest dictionary */
                            dictionary?: (opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null);

                            /** Unknown fields preserved while decoding when enabled */
                            $unknowns?: Uint8Array[];
                        }

                        /** Shape of an ExportProfilesServiceRequest. */
                        type $Shape = {
                          resourceProfiles?: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape[]|null;
                          dictionary?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape|null;
                          $unknowns?: Uint8Array[];
                        };
                    }

                    /**
                     * Properties of an ExportProfilesServiceResponse.
                     * @deprecated Use opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties instead.
                     */
                    interface IExportProfilesServiceResponse extends opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties {
                    }

                    /** Represents an ExportProfilesServiceResponse. */
                    class ExportProfilesServiceResponse {

                        /**
                         * Constructs a new ExportProfilesServiceResponse.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];

                        /** ExportProfilesServiceResponse partialSuccess. */
                        partialSuccess?: (opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties|null);

                        /**
                         * Creates a new ExportProfilesServiceResponse instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ExportProfilesServiceResponse instance
                         */
                        static create(properties: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape;
                        static create(properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse;

                        /**
                         * Encodes the specified ExportProfilesServiceResponse message. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.verify|verify} messages.
                         * @param message ExportProfilesServiceResponse message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        static encode(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ExportProfilesServiceResponse message, length delimited. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.verify|verify} messages.
                         * @param message ExportProfilesServiceResponse message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        static encodeDelimited(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an ExportProfilesServiceResponse message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape} ExportProfilesServiceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape;

                        /**
                         * Decodes an ExportProfilesServiceResponse message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape} ExportProfilesServiceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse & opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Shape;

                        /**
                         * Verifies an ExportProfilesServiceResponse message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an ExportProfilesServiceResponse message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ExportProfilesServiceResponse
                         */
                        static fromObject(object: { [k: string]: any }): opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse;

                        /**
                         * Creates a plain object from an ExportProfilesServiceResponse message. Also converts values to other types if specified.
                         * @param message ExportProfilesServiceResponse
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        static toObject(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ExportProfilesServiceResponse to JSON.
                         * @returns JSON object
                         */
                        toJSON(): { [k: string]: any };

                        /**
                         * Gets the type url for ExportProfilesServiceResponse
                         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                         * @returns The type url
                         */
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace ExportProfilesServiceResponse {

                        /** Properties of an ExportProfilesServiceResponse. */
                        interface $Properties {

                            /** ExportProfilesServiceResponse partialSuccess */
                            partialSuccess?: (opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties|null);

                            /** Unknown fields preserved while decoding when enabled */
                            $unknowns?: Uint8Array[];
                        }

                        /** Shape of an ExportProfilesServiceResponse. */
                        type $Shape = opentelemetry.proto.collector.profiles.v1development.ExportProfilesServiceResponse.$Properties;
                    }

                    /**
                     * Properties of an ExportProfilesPartialSuccess.
                     * @deprecated Use opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties instead.
                     */
                    interface IExportProfilesPartialSuccess extends opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties {
                    }

                    /** Represents an ExportProfilesPartialSuccess. */
                    class ExportProfilesPartialSuccess {

                        /**
                         * Constructs a new ExportProfilesPartialSuccess.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];

                        /** ExportProfilesPartialSuccess rejectedProfiles. */
                        rejectedProfiles: (number|Long);

                        /** ExportProfilesPartialSuccess errorMessage. */
                        errorMessage: string;

                        /**
                         * Creates a new ExportProfilesPartialSuccess instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ExportProfilesPartialSuccess instance
                         */
                        static create(properties: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape;
                        static create(properties?: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess;

                        /**
                         * Encodes the specified ExportProfilesPartialSuccess message. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.verify|verify} messages.
                         * @param message ExportProfilesPartialSuccess message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        static encode(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ExportProfilesPartialSuccess message, length delimited. Does not implicitly {@link opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.verify|verify} messages.
                         * @param message ExportProfilesPartialSuccess message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        static encodeDelimited(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an ExportProfilesPartialSuccess message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape} ExportProfilesPartialSuccess
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape;

                        /**
                         * Decodes an ExportProfilesPartialSuccess message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns {opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape} ExportProfilesPartialSuccess
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess & opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Shape;

                        /**
                         * Verifies an ExportProfilesPartialSuccess message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an ExportProfilesPartialSuccess message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ExportProfilesPartialSuccess
                         */
                        static fromObject(object: { [k: string]: any }): opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess;

                        /**
                         * Creates a plain object from an ExportProfilesPartialSuccess message. Also converts values to other types if specified.
                         * @param message ExportProfilesPartialSuccess
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        static toObject(message: opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ExportProfilesPartialSuccess to JSON.
                         * @returns JSON object
                         */
                        toJSON(): { [k: string]: any };

                        /**
                         * Gets the type url for ExportProfilesPartialSuccess
                         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                         * @returns The type url
                         */
                        static getTypeUrl(prefix?: string): string;
                    }

                    namespace ExportProfilesPartialSuccess {

                        /** Properties of an ExportProfilesPartialSuccess. */
                        interface $Properties {

                            /** ExportProfilesPartialSuccess rejectedProfiles */
                            rejectedProfiles?: (number|Long|null);

                            /** ExportProfilesPartialSuccess errorMessage */
                            errorMessage?: (string|null);

                            /** Unknown fields preserved while decoding when enabled */
                            $unknowns?: Uint8Array[];
                        }

                        /** Shape of an ExportProfilesPartialSuccess. */
                        type $Shape = opentelemetry.proto.collector.profiles.v1development.ExportProfilesPartialSuccess.$Properties;
                    }
                }
            }
        }

        /** Namespace profiles. */
        namespace profiles {

            /** Namespace v1development. */
            namespace v1development {

                /**
                 * Properties of a ProfilesDictionary.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties instead.
                 */
                interface IProfilesDictionary extends opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties {
                }

                /** Represents a ProfilesDictionary. */
                class ProfilesDictionary {

                    /**
                     * Constructs a new ProfilesDictionary.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** ProfilesDictionary mappingTable. */
                    mappingTable: opentelemetry.proto.profiles.v1development.Mapping.$Properties[];

                    /** ProfilesDictionary locationTable. */
                    locationTable: opentelemetry.proto.profiles.v1development.Location.$Properties[];

                    /** ProfilesDictionary functionTable. */
                    functionTable: opentelemetry.proto.profiles.v1development.Function.$Properties[];

                    /** ProfilesDictionary linkTable. */
                    linkTable: opentelemetry.proto.profiles.v1development.Link.$Properties[];

                    /** ProfilesDictionary stringTable. */
                    stringTable: string[];

                    /** ProfilesDictionary attributeTable. */
                    attributeTable: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties[];

                    /** ProfilesDictionary stackTable. */
                    stackTable: opentelemetry.proto.profiles.v1development.Stack.$Properties[];

                    /**
                     * Creates a new ProfilesDictionary instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ProfilesDictionary instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape): opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties): opentelemetry.proto.profiles.v1development.ProfilesDictionary;

                    /**
                     * Encodes the specified ProfilesDictionary message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesDictionary.verify|verify} messages.
                     * @param message ProfilesDictionary message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ProfilesDictionary message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesDictionary.verify|verify} messages.
                     * @param message ProfilesDictionary message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ProfilesDictionary message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape} ProfilesDictionary
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape;

                    /**
                     * Decodes a ProfilesDictionary message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape} ProfilesDictionary
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.ProfilesDictionary & opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape;

                    /**
                     * Verifies a ProfilesDictionary message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ProfilesDictionary message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ProfilesDictionary
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.ProfilesDictionary;

                    /**
                     * Creates a plain object from a ProfilesDictionary message. Also converts values to other types if specified.
                     * @param message ProfilesDictionary
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.ProfilesDictionary, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ProfilesDictionary to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for ProfilesDictionary
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ProfilesDictionary {

                    /** Properties of a ProfilesDictionary. */
                    interface $Properties {

                        /** ProfilesDictionary mappingTable */
                        mappingTable?: (opentelemetry.proto.profiles.v1development.Mapping.$Properties[]|null);

                        /** ProfilesDictionary locationTable */
                        locationTable?: (opentelemetry.proto.profiles.v1development.Location.$Properties[]|null);

                        /** ProfilesDictionary functionTable */
                        functionTable?: (opentelemetry.proto.profiles.v1development.Function.$Properties[]|null);

                        /** ProfilesDictionary linkTable */
                        linkTable?: (opentelemetry.proto.profiles.v1development.Link.$Properties[]|null);

                        /** ProfilesDictionary stringTable */
                        stringTable?: (string[]|null);

                        /** ProfilesDictionary attributeTable */
                        attributeTable?: (opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties[]|null);

                        /** ProfilesDictionary stackTable */
                        stackTable?: (opentelemetry.proto.profiles.v1development.Stack.$Properties[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a ProfilesDictionary. */
                    type $Shape = {
                      mappingTable?: opentelemetry.proto.profiles.v1development.Mapping.$Shape[]|null;
                      locationTable?: opentelemetry.proto.profiles.v1development.Location.$Shape[]|null;
                      functionTable?: opentelemetry.proto.profiles.v1development.Function.$Shape[]|null;
                      linkTable?: opentelemetry.proto.profiles.v1development.Link.$Shape[]|null;
                      stringTable?: string[]|null;
                      attributeTable?: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape[]|null;
                      stackTable?: opentelemetry.proto.profiles.v1development.Stack.$Shape[]|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of a ProfilesData.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.ProfilesData.$Properties instead.
                 */
                interface IProfilesData extends opentelemetry.proto.profiles.v1development.ProfilesData.$Properties {
                }

                /** Represents a ProfilesData. */
                class ProfilesData {

                    /**
                     * Constructs a new ProfilesData.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.ProfilesData.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** ProfilesData resourceProfiles. */
                    resourceProfiles: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties[];

                    /** ProfilesData dictionary. */
                    dictionary?: (opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null);

                    /**
                     * Creates a new ProfilesData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ProfilesData instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.ProfilesData.$Shape): opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.ProfilesData.$Properties): opentelemetry.proto.profiles.v1development.ProfilesData;

                    /**
                     * Encodes the specified ProfilesData message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesData.verify|verify} messages.
                     * @param message ProfilesData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.ProfilesData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ProfilesData message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ProfilesData.verify|verify} messages.
                     * @param message ProfilesData message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.ProfilesData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ProfilesData message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape} ProfilesData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape;

                    /**
                     * Decodes a ProfilesData message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape} ProfilesData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.ProfilesData & opentelemetry.proto.profiles.v1development.ProfilesData.$Shape;

                    /**
                     * Verifies a ProfilesData message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ProfilesData message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ProfilesData
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.ProfilesData;

                    /**
                     * Creates a plain object from a ProfilesData message. Also converts values to other types if specified.
                     * @param message ProfilesData
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.ProfilesData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ProfilesData to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for ProfilesData
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ProfilesData {

                    /** Properties of a ProfilesData. */
                    interface $Properties {

                        /** ProfilesData resourceProfiles */
                        resourceProfiles?: (opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties[]|null);

                        /** ProfilesData dictionary */
                        dictionary?: (opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Properties|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a ProfilesData. */
                    type $Shape = {
                      resourceProfiles?: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape[]|null;
                      dictionary?: opentelemetry.proto.profiles.v1development.ProfilesDictionary.$Shape|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of a ResourceProfiles.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties instead.
                 */
                interface IResourceProfiles extends opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties {
                }

                /** Represents a ResourceProfiles. */
                class ResourceProfiles {

                    /**
                     * Constructs a new ResourceProfiles.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** ResourceProfiles resource. */
                    resource?: (opentelemetry.proto.resource.v1.Resource.$Properties|null);

                    /** ResourceProfiles scopeProfiles. */
                    scopeProfiles: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties[];

                    /** ResourceProfiles schemaUrl. */
                    schemaUrl: string;

                    /**
                     * Creates a new ResourceProfiles instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ResourceProfiles instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape): opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties): opentelemetry.proto.profiles.v1development.ResourceProfiles;

                    /**
                     * Encodes the specified ResourceProfiles message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ResourceProfiles.verify|verify} messages.
                     * @param message ResourceProfiles message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ResourceProfiles message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ResourceProfiles.verify|verify} messages.
                     * @param message ResourceProfiles message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.ResourceProfiles.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ResourceProfiles message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape} ResourceProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape;

                    /**
                     * Decodes a ResourceProfiles message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape} ResourceProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.ResourceProfiles & opentelemetry.proto.profiles.v1development.ResourceProfiles.$Shape;

                    /**
                     * Verifies a ResourceProfiles message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ResourceProfiles message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ResourceProfiles
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.ResourceProfiles;

                    /**
                     * Creates a plain object from a ResourceProfiles message. Also converts values to other types if specified.
                     * @param message ResourceProfiles
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.ResourceProfiles, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ResourceProfiles to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for ResourceProfiles
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ResourceProfiles {

                    /** Properties of a ResourceProfiles. */
                    interface $Properties {

                        /** ResourceProfiles resource */
                        resource?: (opentelemetry.proto.resource.v1.Resource.$Properties|null);

                        /** ResourceProfiles scopeProfiles */
                        scopeProfiles?: (opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties[]|null);

                        /** ResourceProfiles schemaUrl */
                        schemaUrl?: (string|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a ResourceProfiles. */
                    type $Shape = {
                      resource?: opentelemetry.proto.resource.v1.Resource.$Shape|null;
                      scopeProfiles?: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape[]|null;
                      schemaUrl?: string|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of a ScopeProfiles.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties instead.
                 */
                interface IScopeProfiles extends opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties {
                }

                /** Represents a ScopeProfiles. */
                class ScopeProfiles {

                    /**
                     * Constructs a new ScopeProfiles.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** ScopeProfiles scope. */
                    scope?: (opentelemetry.proto.common.v1.InstrumentationScope.$Properties|null);

                    /** ScopeProfiles profiles. */
                    profiles: opentelemetry.proto.profiles.v1development.Profile.$Properties[];

                    /** ScopeProfiles schemaUrl. */
                    schemaUrl: string;

                    /**
                     * Creates a new ScopeProfiles instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ScopeProfiles instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape): opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties): opentelemetry.proto.profiles.v1development.ScopeProfiles;

                    /**
                     * Encodes the specified ScopeProfiles message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ScopeProfiles.verify|verify} messages.
                     * @param message ScopeProfiles message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ScopeProfiles message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ScopeProfiles.verify|verify} messages.
                     * @param message ScopeProfiles message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.ScopeProfiles.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ScopeProfiles message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape} ScopeProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape;

                    /**
                     * Decodes a ScopeProfiles message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape} ScopeProfiles
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.ScopeProfiles & opentelemetry.proto.profiles.v1development.ScopeProfiles.$Shape;

                    /**
                     * Verifies a ScopeProfiles message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ScopeProfiles message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ScopeProfiles
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.ScopeProfiles;

                    /**
                     * Creates a plain object from a ScopeProfiles message. Also converts values to other types if specified.
                     * @param message ScopeProfiles
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.ScopeProfiles, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ScopeProfiles to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for ScopeProfiles
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ScopeProfiles {

                    /** Properties of a ScopeProfiles. */
                    interface $Properties {

                        /** ScopeProfiles scope */
                        scope?: (opentelemetry.proto.common.v1.InstrumentationScope.$Properties|null);

                        /** ScopeProfiles profiles */
                        profiles?: (opentelemetry.proto.profiles.v1development.Profile.$Properties[]|null);

                        /** ScopeProfiles schemaUrl */
                        schemaUrl?: (string|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a ScopeProfiles. */
                    type $Shape = {
                      scope?: opentelemetry.proto.common.v1.InstrumentationScope.$Shape|null;
                      profiles?: opentelemetry.proto.profiles.v1development.Profile.$Shape[]|null;
                      schemaUrl?: string|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of a Profile.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Profile.$Properties instead.
                 */
                interface IProfile extends opentelemetry.proto.profiles.v1development.Profile.$Properties {
                }

                /** Represents a Profile. */
                class Profile {

                    /**
                     * Constructs a new Profile.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Profile.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Profile sampleType. */
                    sampleType?: (opentelemetry.proto.profiles.v1development.ValueType.$Properties|null);

                    /** Profile samples. */
                    samples: opentelemetry.proto.profiles.v1development.Sample.$Properties[];

                    /** Profile timeUnixNano. */
                    timeUnixNano: (number|Long);

                    /** Profile durationNano. */
                    durationNano: (number|Long);

                    /** Profile periodType. */
                    periodType?: (opentelemetry.proto.profiles.v1development.ValueType.$Properties|null);

                    /** Profile period. */
                    period: (number|Long);

                    /** Profile profileId. */
                    profileId: Uint8Array;

                    /** Profile droppedAttributesCount. */
                    droppedAttributesCount: number;

                    /** Profile originalPayloadFormat. */
                    originalPayloadFormat: string;

                    /** Profile originalPayload. */
                    originalPayload: Uint8Array;

                    /** Profile attributeIndices. */
                    attributeIndices: number[];

                    /**
                     * Creates a new Profile instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Profile instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Profile.$Shape): opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Profile.$Properties): opentelemetry.proto.profiles.v1development.Profile;

                    /**
                     * Encodes the specified Profile message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Profile.verify|verify} messages.
                     * @param message Profile message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Profile.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Profile message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Profile.verify|verify} messages.
                     * @param message Profile message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Profile.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Profile message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape} Profile
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape;

                    /**
                     * Decodes a Profile message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape} Profile
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Profile & opentelemetry.proto.profiles.v1development.Profile.$Shape;

                    /**
                     * Verifies a Profile message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Profile message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Profile
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Profile;

                    /**
                     * Creates a plain object from a Profile message. Also converts values to other types if specified.
                     * @param message Profile
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Profile, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Profile to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Profile
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Profile {

                    /** Properties of a Profile. */
                    interface $Properties {

                        /** Profile sampleType */
                        sampleType?: (opentelemetry.proto.profiles.v1development.ValueType.$Properties|null);

                        /** Profile samples */
                        samples?: (opentelemetry.proto.profiles.v1development.Sample.$Properties[]|null);

                        /** Profile timeUnixNano */
                        timeUnixNano?: (number|Long|null);

                        /** Profile durationNano */
                        durationNano?: (number|Long|null);

                        /** Profile periodType */
                        periodType?: (opentelemetry.proto.profiles.v1development.ValueType.$Properties|null);

                        /** Profile period */
                        period?: (number|Long|null);

                        /** Profile profileId */
                        profileId?: (Uint8Array|null);

                        /** Profile droppedAttributesCount */
                        droppedAttributesCount?: (number|null);

                        /** Profile originalPayloadFormat */
                        originalPayloadFormat?: (string|null);

                        /** Profile originalPayload */
                        originalPayload?: (Uint8Array|null);

                        /** Profile attributeIndices */
                        attributeIndices?: (number[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Profile. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Profile.$Properties;
                }

                /**
                 * Properties of a Link.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Link.$Properties instead.
                 */
                interface ILink extends opentelemetry.proto.profiles.v1development.Link.$Properties {
                }

                /** Represents a Link. */
                class Link {

                    /**
                     * Constructs a new Link.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Link.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Link traceId. */
                    traceId: Uint8Array;

                    /** Link spanId. */
                    spanId: Uint8Array;

                    /**
                     * Creates a new Link instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Link instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Link.$Shape): opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Link.$Properties): opentelemetry.proto.profiles.v1development.Link;

                    /**
                     * Encodes the specified Link message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Link.verify|verify} messages.
                     * @param message Link message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Link.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Link message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Link.verify|verify} messages.
                     * @param message Link message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Link.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Link message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape;

                    /**
                     * Decodes a Link message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Link & opentelemetry.proto.profiles.v1development.Link.$Shape;

                    /**
                     * Verifies a Link message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Link message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Link
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Link;

                    /**
                     * Creates a plain object from a Link message. Also converts values to other types if specified.
                     * @param message Link
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Link, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Link to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Link
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Link {

                    /** Properties of a Link. */
                    interface $Properties {

                        /** Link traceId */
                        traceId?: (Uint8Array|null);

                        /** Link spanId */
                        spanId?: (Uint8Array|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Link. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Link.$Properties;
                }

                /**
                 * Properties of a ValueType.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.ValueType.$Properties instead.
                 */
                interface IValueType extends opentelemetry.proto.profiles.v1development.ValueType.$Properties {
                }

                /** Represents a ValueType. */
                class ValueType {

                    /**
                     * Constructs a new ValueType.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.ValueType.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** ValueType typeStrindex. */
                    typeStrindex: number;

                    /** ValueType unitStrindex. */
                    unitStrindex: number;

                    /**
                     * Creates a new ValueType instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValueType instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.ValueType.$Shape): opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.ValueType.$Properties): opentelemetry.proto.profiles.v1development.ValueType;

                    /**
                     * Encodes the specified ValueType message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ValueType.verify|verify} messages.
                     * @param message ValueType message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.ValueType.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ValueType message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.ValueType.verify|verify} messages.
                     * @param message ValueType message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.ValueType.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValueType message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape} ValueType
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape;

                    /**
                     * Decodes a ValueType message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape} ValueType
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.ValueType & opentelemetry.proto.profiles.v1development.ValueType.$Shape;

                    /**
                     * Verifies a ValueType message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ValueType message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ValueType
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.ValueType;

                    /**
                     * Creates a plain object from a ValueType message. Also converts values to other types if specified.
                     * @param message ValueType
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.ValueType, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ValueType to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for ValueType
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ValueType {

                    /** Properties of a ValueType. */
                    interface $Properties {

                        /** ValueType typeStrindex */
                        typeStrindex?: (number|null);

                        /** ValueType unitStrindex */
                        unitStrindex?: (number|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a ValueType. */
                    type $Shape = opentelemetry.proto.profiles.v1development.ValueType.$Properties;
                }

                /**
                 * Properties of a Sample.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Sample.$Properties instead.
                 */
                interface ISample extends opentelemetry.proto.profiles.v1development.Sample.$Properties {
                }

                /** Represents a Sample. */
                class Sample {

                    /**
                     * Constructs a new Sample.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Sample.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Sample stackIndex. */
                    stackIndex: number;

                    /** Sample attributeIndices. */
                    attributeIndices: number[];

                    /** Sample linkIndex. */
                    linkIndex: number;

                    /** Sample values. */
                    values: (number|Long)[];

                    /** Sample timestampsUnixNano. */
                    timestampsUnixNano: (number|Long)[];

                    /**
                     * Creates a new Sample instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Sample instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Sample.$Shape): opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Sample.$Properties): opentelemetry.proto.profiles.v1development.Sample;

                    /**
                     * Encodes the specified Sample message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Sample.verify|verify} messages.
                     * @param message Sample message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Sample.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Sample message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Sample.verify|verify} messages.
                     * @param message Sample message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Sample.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Sample message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape} Sample
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape;

                    /**
                     * Decodes a Sample message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape} Sample
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Sample & opentelemetry.proto.profiles.v1development.Sample.$Shape;

                    /**
                     * Verifies a Sample message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Sample message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Sample
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Sample;

                    /**
                     * Creates a plain object from a Sample message. Also converts values to other types if specified.
                     * @param message Sample
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Sample, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Sample to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Sample
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Sample {

                    /** Properties of a Sample. */
                    interface $Properties {

                        /** Sample stackIndex */
                        stackIndex?: (number|null);

                        /** Sample attributeIndices */
                        attributeIndices?: (number[]|null);

                        /** Sample linkIndex */
                        linkIndex?: (number|null);

                        /** Sample values */
                        values?: ((number|Long)[]|null);

                        /** Sample timestampsUnixNano */
                        timestampsUnixNano?: ((number|Long)[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Sample. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Sample.$Properties;
                }

                /**
                 * Properties of a Mapping.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Mapping.$Properties instead.
                 */
                interface IMapping extends opentelemetry.proto.profiles.v1development.Mapping.$Properties {
                }

                /** Represents a Mapping. */
                class Mapping {

                    /**
                     * Constructs a new Mapping.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Mapping.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Mapping memoryStart. */
                    memoryStart: (number|Long);

                    /** Mapping memoryLimit. */
                    memoryLimit: (number|Long);

                    /** Mapping fileOffset. */
                    fileOffset: (number|Long);

                    /** Mapping filenameStrindex. */
                    filenameStrindex: number;

                    /** Mapping attributeIndices. */
                    attributeIndices: number[];

                    /**
                     * Creates a new Mapping instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Mapping instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Mapping.$Shape): opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Mapping.$Properties): opentelemetry.proto.profiles.v1development.Mapping;

                    /**
                     * Encodes the specified Mapping message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Mapping.verify|verify} messages.
                     * @param message Mapping message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Mapping.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Mapping message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Mapping.verify|verify} messages.
                     * @param message Mapping message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Mapping.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Mapping message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape} Mapping
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape;

                    /**
                     * Decodes a Mapping message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape} Mapping
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Mapping & opentelemetry.proto.profiles.v1development.Mapping.$Shape;

                    /**
                     * Verifies a Mapping message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Mapping message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Mapping
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Mapping;

                    /**
                     * Creates a plain object from a Mapping message. Also converts values to other types if specified.
                     * @param message Mapping
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Mapping, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Mapping to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Mapping
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Mapping {

                    /** Properties of a Mapping. */
                    interface $Properties {

                        /** Mapping memoryStart */
                        memoryStart?: (number|Long|null);

                        /** Mapping memoryLimit */
                        memoryLimit?: (number|Long|null);

                        /** Mapping fileOffset */
                        fileOffset?: (number|Long|null);

                        /** Mapping filenameStrindex */
                        filenameStrindex?: (number|null);

                        /** Mapping attributeIndices */
                        attributeIndices?: (number[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Mapping. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Mapping.$Properties;
                }

                /**
                 * Properties of a Stack.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Stack.$Properties instead.
                 */
                interface IStack extends opentelemetry.proto.profiles.v1development.Stack.$Properties {
                }

                /** Represents a Stack. */
                class Stack {

                    /**
                     * Constructs a new Stack.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Stack.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Stack locationIndices. */
                    locationIndices: number[];

                    /**
                     * Creates a new Stack instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Stack instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Stack.$Shape): opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Stack.$Properties): opentelemetry.proto.profiles.v1development.Stack;

                    /**
                     * Encodes the specified Stack message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Stack.verify|verify} messages.
                     * @param message Stack message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Stack.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Stack message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Stack.verify|verify} messages.
                     * @param message Stack message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Stack.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Stack message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape} Stack
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape;

                    /**
                     * Decodes a Stack message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape} Stack
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Stack & opentelemetry.proto.profiles.v1development.Stack.$Shape;

                    /**
                     * Verifies a Stack message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Stack message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Stack
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Stack;

                    /**
                     * Creates a plain object from a Stack message. Also converts values to other types if specified.
                     * @param message Stack
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Stack, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Stack to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Stack
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Stack {

                    /** Properties of a Stack. */
                    interface $Properties {

                        /** Stack locationIndices */
                        locationIndices?: (number[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Stack. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Stack.$Properties;
                }

                /**
                 * Properties of a Location.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Location.$Properties instead.
                 */
                interface ILocation extends opentelemetry.proto.profiles.v1development.Location.$Properties {
                }

                /** Represents a Location. */
                class Location {

                    /**
                     * Constructs a new Location.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Location.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Location mappingIndex. */
                    mappingIndex: number;

                    /** Location address. */
                    address: (number|Long);

                    /** Location lines. */
                    lines: opentelemetry.proto.profiles.v1development.Line.$Properties[];

                    /** Location attributeIndices. */
                    attributeIndices: number[];

                    /**
                     * Creates a new Location instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Location instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Location.$Shape): opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Location.$Properties): opentelemetry.proto.profiles.v1development.Location;

                    /**
                     * Encodes the specified Location message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Location.verify|verify} messages.
                     * @param message Location message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Location.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Location message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Location.verify|verify} messages.
                     * @param message Location message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Location.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Location message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape} Location
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape;

                    /**
                     * Decodes a Location message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape} Location
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Location & opentelemetry.proto.profiles.v1development.Location.$Shape;

                    /**
                     * Verifies a Location message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Location message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Location
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Location;

                    /**
                     * Creates a plain object from a Location message. Also converts values to other types if specified.
                     * @param message Location
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Location to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Location
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Location {

                    /** Properties of a Location. */
                    interface $Properties {

                        /** Location mappingIndex */
                        mappingIndex?: (number|null);

                        /** Location address */
                        address?: (number|Long|null);

                        /** Location lines */
                        lines?: (opentelemetry.proto.profiles.v1development.Line.$Properties[]|null);

                        /** Location attributeIndices */
                        attributeIndices?: (number[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Location. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Location.$Properties;
                }

                /**
                 * Properties of a Line.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Line.$Properties instead.
                 */
                interface ILine extends opentelemetry.proto.profiles.v1development.Line.$Properties {
                }

                /** Represents a Line. */
                class Line {

                    /**
                     * Constructs a new Line.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Line.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Line functionIndex. */
                    functionIndex: number;

                    /** Line line. */
                    line: (number|Long);

                    /** Line column. */
                    column: (number|Long);

                    /**
                     * Creates a new Line instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Line instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Line.$Shape): opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Line.$Properties): opentelemetry.proto.profiles.v1development.Line;

                    /**
                     * Encodes the specified Line message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Line.verify|verify} messages.
                     * @param message Line message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Line.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Line message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Line.verify|verify} messages.
                     * @param message Line message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Line.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Line message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape} Line
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape;

                    /**
                     * Decodes a Line message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape} Line
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Line & opentelemetry.proto.profiles.v1development.Line.$Shape;

                    /**
                     * Verifies a Line message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Line message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Line
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Line;

                    /**
                     * Creates a plain object from a Line message. Also converts values to other types if specified.
                     * @param message Line
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Line, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Line to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Line
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Line {

                    /** Properties of a Line. */
                    interface $Properties {

                        /** Line functionIndex */
                        functionIndex?: (number|null);

                        /** Line line */
                        line?: (number|Long|null);

                        /** Line column */
                        column?: (number|Long|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Line. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Line.$Properties;
                }

                /**
                 * Properties of a Function.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.Function.$Properties instead.
                 */
                interface IFunction extends opentelemetry.proto.profiles.v1development.Function.$Properties {
                }

                /** Represents a Function. */
                class Function {

                    /**
                     * Constructs a new Function.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.Function.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Function nameStrindex. */
                    nameStrindex: number;

                    /** Function systemNameStrindex. */
                    systemNameStrindex: number;

                    /** Function filenameStrindex. */
                    filenameStrindex: number;

                    /** Function startLine. */
                    startLine: (number|Long);

                    /**
                     * Creates a new Function instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Function instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.Function.$Shape): opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.Function.$Properties): opentelemetry.proto.profiles.v1development.Function;

                    /**
                     * Encodes the specified Function message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Function.verify|verify} messages.
                     * @param message Function message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.Function.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Function message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.Function.verify|verify} messages.
                     * @param message Function message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.Function.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Function message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape} Function
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape;

                    /**
                     * Decodes a Function message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape} Function
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.Function & opentelemetry.proto.profiles.v1development.Function.$Shape;

                    /**
                     * Verifies a Function message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Function message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Function
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.Function;

                    /**
                     * Creates a plain object from a Function message. Also converts values to other types if specified.
                     * @param message Function
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.Function, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Function to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Function
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Function {

                    /** Properties of a Function. */
                    interface $Properties {

                        /** Function nameStrindex */
                        nameStrindex?: (number|null);

                        /** Function systemNameStrindex */
                        systemNameStrindex?: (number|null);

                        /** Function filenameStrindex */
                        filenameStrindex?: (number|null);

                        /** Function startLine */
                        startLine?: (number|Long|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Function. */
                    type $Shape = opentelemetry.proto.profiles.v1development.Function.$Properties;
                }

                /**
                 * Properties of a KeyValueAndUnit.
                 * @deprecated Use opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties instead.
                 */
                interface IKeyValueAndUnit extends opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties {
                }

                /** Represents a KeyValueAndUnit. */
                class KeyValueAndUnit {

                    /**
                     * Constructs a new KeyValueAndUnit.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** KeyValueAndUnit keyStrindex. */
                    keyStrindex: number;

                    /** KeyValueAndUnit value. */
                    value?: (opentelemetry.proto.common.v1.AnyValue.$Properties|null);

                    /** KeyValueAndUnit unitStrindex. */
                    unitStrindex: number;

                    /**
                     * Creates a new KeyValueAndUnit instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns KeyValueAndUnit instance
                     */
                    static create(properties: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape): opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape;
                    static create(properties?: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties): opentelemetry.proto.profiles.v1development.KeyValueAndUnit;

                    /**
                     * Encodes the specified KeyValueAndUnit message. Does not implicitly {@link opentelemetry.proto.profiles.v1development.KeyValueAndUnit.verify|verify} messages.
                     * @param message KeyValueAndUnit message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified KeyValueAndUnit message, length delimited. Does not implicitly {@link opentelemetry.proto.profiles.v1development.KeyValueAndUnit.verify|verify} messages.
                     * @param message KeyValueAndUnit message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a KeyValueAndUnit message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape} KeyValueAndUnit
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape;

                    /**
                     * Decodes a KeyValueAndUnit message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape} KeyValueAndUnit
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.profiles.v1development.KeyValueAndUnit & opentelemetry.proto.profiles.v1development.KeyValueAndUnit.$Shape;

                    /**
                     * Verifies a KeyValueAndUnit message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a KeyValueAndUnit message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns KeyValueAndUnit
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.profiles.v1development.KeyValueAndUnit;

                    /**
                     * Creates a plain object from a KeyValueAndUnit message. Also converts values to other types if specified.
                     * @param message KeyValueAndUnit
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.profiles.v1development.KeyValueAndUnit, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this KeyValueAndUnit to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for KeyValueAndUnit
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace KeyValueAndUnit {

                    /** Properties of a KeyValueAndUnit. */
                    interface $Properties {

                        /** KeyValueAndUnit keyStrindex */
                        keyStrindex?: (number|null);

                        /** KeyValueAndUnit value */
                        value?: (opentelemetry.proto.common.v1.AnyValue.$Properties|null);

                        /** KeyValueAndUnit unitStrindex */
                        unitStrindex?: (number|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a KeyValueAndUnit. */
                    type $Shape = {
                      keyStrindex?: number|null;
                      value?: opentelemetry.proto.common.v1.AnyValue.$Shape|null;
                      unitStrindex?: number|null;
                      $unknowns?: Uint8Array[];
                    };
                }
            }
        }

        /** Namespace common. */
        namespace common {

            /** Namespace v1. */
            namespace v1 {

                /**
                 * Properties of an AnyValue.
                 * @deprecated Use opentelemetry.proto.common.v1.AnyValue.$Properties instead.
                 */
                interface IAnyValue extends opentelemetry.proto.common.v1.AnyValue.$Properties {
                }

                /** Represents an AnyValue. */
                class AnyValue {

                    /**
                     * Constructs a new AnyValue.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.common.v1.AnyValue.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** AnyValue stringValue. */
                    stringValue?: (string|null);

                    /** AnyValue boolValue. */
                    boolValue?: (boolean|null);

                    /** AnyValue intValue. */
                    intValue?: (number|Long|null);

                    /** AnyValue doubleValue. */
                    doubleValue?: (number|null);

                    /** AnyValue arrayValue. */
                    arrayValue?: (opentelemetry.proto.common.v1.ArrayValue.$Properties|null);

                    /** AnyValue kvlistValue. */
                    kvlistValue?: (opentelemetry.proto.common.v1.KeyValueList.$Properties|null);

                    /** AnyValue bytesValue. */
                    bytesValue?: (Uint8Array|null);

                    /** AnyValue stringValueStrindex. */
                    stringValueStrindex?: (number|null);

                    /** AnyValue value. */
                    value?: ("stringValue"|"boolValue"|"intValue"|"doubleValue"|"arrayValue"|"kvlistValue"|"bytesValue"|"stringValueStrindex");

                    /**
                     * Creates a new AnyValue instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AnyValue instance
                     */
                    static create(properties: opentelemetry.proto.common.v1.AnyValue.$Shape): opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape;
                    static create(properties?: opentelemetry.proto.common.v1.AnyValue.$Properties): opentelemetry.proto.common.v1.AnyValue;

                    /**
                     * Encodes the specified AnyValue message. Does not implicitly {@link opentelemetry.proto.common.v1.AnyValue.verify|verify} messages.
                     * @param message AnyValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.common.v1.AnyValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AnyValue message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.AnyValue.verify|verify} messages.
                     * @param message AnyValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.common.v1.AnyValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AnyValue message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape} AnyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape;

                    /**
                     * Decodes an AnyValue message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape} AnyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.common.v1.AnyValue & opentelemetry.proto.common.v1.AnyValue.$Shape;

                    /**
                     * Verifies an AnyValue message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AnyValue message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AnyValue
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.common.v1.AnyValue;

                    /**
                     * Creates a plain object from an AnyValue message. Also converts values to other types if specified.
                     * @param message AnyValue
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.common.v1.AnyValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AnyValue to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for AnyValue
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace AnyValue {

                    /** Properties of an AnyValue. */
                    interface $Properties {

                        /** AnyValue stringValue */
                        stringValue?: (string|null);

                        /** AnyValue boolValue */
                        boolValue?: (boolean|null);

                        /** AnyValue intValue */
                        intValue?: (number|Long|null);

                        /** AnyValue doubleValue */
                        doubleValue?: (number|null);

                        /** AnyValue arrayValue */
                        arrayValue?: (opentelemetry.proto.common.v1.ArrayValue.$Properties|null);

                        /** AnyValue kvlistValue */
                        kvlistValue?: (opentelemetry.proto.common.v1.KeyValueList.$Properties|null);

                        /** AnyValue bytesValue */
                        bytesValue?: (Uint8Array|null);

                        /** AnyValue stringValueStrindex */
                        stringValueStrindex?: (number|null);

                        /** AnyValue value */
                        value?: ("stringValue"|"boolValue"|"intValue"|"doubleValue"|"arrayValue"|"kvlistValue"|"bytesValue"|"stringValueStrindex");

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Narrowed shape of an AnyValue. */
                    type $Shape = {
                      stringValue?: string|null;
                      boolValue?: boolean|null;
                      intValue?: number|Long|null;
                      doubleValue?: number|null;
                      arrayValue?: opentelemetry.proto.common.v1.ArrayValue.$Shape|null;
                      kvlistValue?: opentelemetry.proto.common.v1.KeyValueList.$Shape|null;
                      bytesValue?: Uint8Array|null;
                      stringValueStrindex?: number|null;
                      $unknowns?: Uint8Array[];
                    } & (
                      ({ value?: undefined; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "stringValue"; stringValue: string; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "boolValue"; stringValue?: null; boolValue: boolean; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "intValue"; stringValue?: null; boolValue?: null; intValue: number|Long; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "doubleValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue: number; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "arrayValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue: opentelemetry.proto.common.v1.ArrayValue.$Shape; kvlistValue?: null; bytesValue?: null; stringValueStrindex?: null }|{ value?: "kvlistValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue: opentelemetry.proto.common.v1.KeyValueList.$Shape; bytesValue?: null; stringValueStrindex?: null }|{ value?: "bytesValue"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue: Uint8Array; stringValueStrindex?: null }|{ value?: "stringValueStrindex"; stringValue?: null; boolValue?: null; intValue?: null; doubleValue?: null; arrayValue?: null; kvlistValue?: null; bytesValue?: null; stringValueStrindex: number })
                    );
                }

                /**
                 * Properties of an ArrayValue.
                 * @deprecated Use opentelemetry.proto.common.v1.ArrayValue.$Properties instead.
                 */
                interface IArrayValue extends opentelemetry.proto.common.v1.ArrayValue.$Properties {
                }

                /** Represents an ArrayValue. */
                class ArrayValue {

                    /**
                     * Constructs a new ArrayValue.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.common.v1.ArrayValue.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** ArrayValue values. */
                    values: opentelemetry.proto.common.v1.AnyValue.$Properties[];

                    /**
                     * Creates a new ArrayValue instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ArrayValue instance
                     */
                    static create(properties: opentelemetry.proto.common.v1.ArrayValue.$Shape): opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape;
                    static create(properties?: opentelemetry.proto.common.v1.ArrayValue.$Properties): opentelemetry.proto.common.v1.ArrayValue;

                    /**
                     * Encodes the specified ArrayValue message. Does not implicitly {@link opentelemetry.proto.common.v1.ArrayValue.verify|verify} messages.
                     * @param message ArrayValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.common.v1.ArrayValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ArrayValue message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.ArrayValue.verify|verify} messages.
                     * @param message ArrayValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.common.v1.ArrayValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ArrayValue message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape} ArrayValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape;

                    /**
                     * Decodes an ArrayValue message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape} ArrayValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.common.v1.ArrayValue & opentelemetry.proto.common.v1.ArrayValue.$Shape;

                    /**
                     * Verifies an ArrayValue message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ArrayValue message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ArrayValue
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.common.v1.ArrayValue;

                    /**
                     * Creates a plain object from an ArrayValue message. Also converts values to other types if specified.
                     * @param message ArrayValue
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.common.v1.ArrayValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ArrayValue to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for ArrayValue
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace ArrayValue {

                    /** Properties of an ArrayValue. */
                    interface $Properties {

                        /** ArrayValue values */
                        values?: (opentelemetry.proto.common.v1.AnyValue.$Properties[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of an ArrayValue. */
                    type $Shape = {
                      values?: opentelemetry.proto.common.v1.AnyValue.$Shape[]|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of a KeyValueList.
                 * @deprecated Use opentelemetry.proto.common.v1.KeyValueList.$Properties instead.
                 */
                interface IKeyValueList extends opentelemetry.proto.common.v1.KeyValueList.$Properties {
                }

                /** Represents a KeyValueList. */
                class KeyValueList {

                    /**
                     * Constructs a new KeyValueList.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.common.v1.KeyValueList.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** KeyValueList values. */
                    values: opentelemetry.proto.common.v1.KeyValue.$Properties[];

                    /**
                     * Creates a new KeyValueList instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns KeyValueList instance
                     */
                    static create(properties: opentelemetry.proto.common.v1.KeyValueList.$Shape): opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape;
                    static create(properties?: opentelemetry.proto.common.v1.KeyValueList.$Properties): opentelemetry.proto.common.v1.KeyValueList;

                    /**
                     * Encodes the specified KeyValueList message. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValueList.verify|verify} messages.
                     * @param message KeyValueList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.common.v1.KeyValueList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified KeyValueList message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValueList.verify|verify} messages.
                     * @param message KeyValueList message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.common.v1.KeyValueList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a KeyValueList message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape} KeyValueList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape;

                    /**
                     * Decodes a KeyValueList message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape} KeyValueList
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.common.v1.KeyValueList & opentelemetry.proto.common.v1.KeyValueList.$Shape;

                    /**
                     * Verifies a KeyValueList message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a KeyValueList message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns KeyValueList
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.common.v1.KeyValueList;

                    /**
                     * Creates a plain object from a KeyValueList message. Also converts values to other types if specified.
                     * @param message KeyValueList
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.common.v1.KeyValueList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this KeyValueList to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for KeyValueList
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace KeyValueList {

                    /** Properties of a KeyValueList. */
                    interface $Properties {

                        /** KeyValueList values */
                        values?: (opentelemetry.proto.common.v1.KeyValue.$Properties[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a KeyValueList. */
                    type $Shape = {
                      values?: opentelemetry.proto.common.v1.KeyValue.$Shape[]|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of a KeyValue.
                 * @deprecated Use opentelemetry.proto.common.v1.KeyValue.$Properties instead.
                 */
                interface IKeyValue extends opentelemetry.proto.common.v1.KeyValue.$Properties {
                }

                /** Represents a KeyValue. */
                class KeyValue {

                    /**
                     * Constructs a new KeyValue.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.common.v1.KeyValue.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** KeyValue key. */
                    key: string;

                    /** KeyValue value. */
                    value?: (opentelemetry.proto.common.v1.AnyValue.$Properties|null);

                    /** KeyValue keyStrindex. */
                    keyStrindex: number;

                    /**
                     * Creates a new KeyValue instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns KeyValue instance
                     */
                    static create(properties: opentelemetry.proto.common.v1.KeyValue.$Shape): opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape;
                    static create(properties?: opentelemetry.proto.common.v1.KeyValue.$Properties): opentelemetry.proto.common.v1.KeyValue;

                    /**
                     * Encodes the specified KeyValue message. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValue.verify|verify} messages.
                     * @param message KeyValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.common.v1.KeyValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified KeyValue message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.KeyValue.verify|verify} messages.
                     * @param message KeyValue message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.common.v1.KeyValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a KeyValue message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape} KeyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape;

                    /**
                     * Decodes a KeyValue message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape} KeyValue
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.common.v1.KeyValue & opentelemetry.proto.common.v1.KeyValue.$Shape;

                    /**
                     * Verifies a KeyValue message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a KeyValue message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns KeyValue
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.common.v1.KeyValue;

                    /**
                     * Creates a plain object from a KeyValue message. Also converts values to other types if specified.
                     * @param message KeyValue
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.common.v1.KeyValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this KeyValue to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for KeyValue
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace KeyValue {

                    /** Properties of a KeyValue. */
                    interface $Properties {

                        /** KeyValue key */
                        key?: (string|null);

                        /** KeyValue value */
                        value?: (opentelemetry.proto.common.v1.AnyValue.$Properties|null);

                        /** KeyValue keyStrindex */
                        keyStrindex?: (number|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a KeyValue. */
                    type $Shape = {
                      key?: string|null;
                      value?: opentelemetry.proto.common.v1.AnyValue.$Shape|null;
                      keyStrindex?: number|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of an InstrumentationScope.
                 * @deprecated Use opentelemetry.proto.common.v1.InstrumentationScope.$Properties instead.
                 */
                interface IInstrumentationScope extends opentelemetry.proto.common.v1.InstrumentationScope.$Properties {
                }

                /** Represents an InstrumentationScope. */
                class InstrumentationScope {

                    /**
                     * Constructs a new InstrumentationScope.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.common.v1.InstrumentationScope.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** InstrumentationScope name. */
                    name: string;

                    /** InstrumentationScope version. */
                    version: string;

                    /** InstrumentationScope attributes. */
                    attributes: opentelemetry.proto.common.v1.KeyValue.$Properties[];

                    /** InstrumentationScope droppedAttributesCount. */
                    droppedAttributesCount: number;

                    /**
                     * Creates a new InstrumentationScope instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns InstrumentationScope instance
                     */
                    static create(properties: opentelemetry.proto.common.v1.InstrumentationScope.$Shape): opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape;
                    static create(properties?: opentelemetry.proto.common.v1.InstrumentationScope.$Properties): opentelemetry.proto.common.v1.InstrumentationScope;

                    /**
                     * Encodes the specified InstrumentationScope message. Does not implicitly {@link opentelemetry.proto.common.v1.InstrumentationScope.verify|verify} messages.
                     * @param message InstrumentationScope message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.common.v1.InstrumentationScope.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified InstrumentationScope message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.InstrumentationScope.verify|verify} messages.
                     * @param message InstrumentationScope message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.common.v1.InstrumentationScope.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an InstrumentationScope message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape} InstrumentationScope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape;

                    /**
                     * Decodes an InstrumentationScope message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape} InstrumentationScope
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.common.v1.InstrumentationScope & opentelemetry.proto.common.v1.InstrumentationScope.$Shape;

                    /**
                     * Verifies an InstrumentationScope message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an InstrumentationScope message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns InstrumentationScope
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.common.v1.InstrumentationScope;

                    /**
                     * Creates a plain object from an InstrumentationScope message. Also converts values to other types if specified.
                     * @param message InstrumentationScope
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.common.v1.InstrumentationScope, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this InstrumentationScope to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for InstrumentationScope
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace InstrumentationScope {

                    /** Properties of an InstrumentationScope. */
                    interface $Properties {

                        /** InstrumentationScope name */
                        name?: (string|null);

                        /** InstrumentationScope version */
                        version?: (string|null);

                        /** InstrumentationScope attributes */
                        attributes?: (opentelemetry.proto.common.v1.KeyValue.$Properties[]|null);

                        /** InstrumentationScope droppedAttributesCount */
                        droppedAttributesCount?: (number|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of an InstrumentationScope. */
                    type $Shape = {
                      name?: string|null;
                      version?: string|null;
                      attributes?: opentelemetry.proto.common.v1.KeyValue.$Shape[]|null;
                      droppedAttributesCount?: number|null;
                      $unknowns?: Uint8Array[];
                    };
                }

                /**
                 * Properties of an EntityRef.
                 * @deprecated Use opentelemetry.proto.common.v1.EntityRef.$Properties instead.
                 */
                interface IEntityRef extends opentelemetry.proto.common.v1.EntityRef.$Properties {
                }

                /** Represents an EntityRef. */
                class EntityRef {

                    /**
                     * Constructs a new EntityRef.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.common.v1.EntityRef.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** EntityRef schemaUrl. */
                    schemaUrl: string;

                    /** EntityRef type. */
                    type: string;

                    /** EntityRef idKeys. */
                    idKeys: string[];

                    /** EntityRef descriptionKeys. */
                    descriptionKeys: string[];

                    /**
                     * Creates a new EntityRef instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EntityRef instance
                     */
                    static create(properties: opentelemetry.proto.common.v1.EntityRef.$Shape): opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape;
                    static create(properties?: opentelemetry.proto.common.v1.EntityRef.$Properties): opentelemetry.proto.common.v1.EntityRef;

                    /**
                     * Encodes the specified EntityRef message. Does not implicitly {@link opentelemetry.proto.common.v1.EntityRef.verify|verify} messages.
                     * @param message EntityRef message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.common.v1.EntityRef.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EntityRef message, length delimited. Does not implicitly {@link opentelemetry.proto.common.v1.EntityRef.verify|verify} messages.
                     * @param message EntityRef message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.common.v1.EntityRef.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EntityRef message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape} EntityRef
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape;

                    /**
                     * Decodes an EntityRef message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape} EntityRef
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.common.v1.EntityRef & opentelemetry.proto.common.v1.EntityRef.$Shape;

                    /**
                     * Verifies an EntityRef message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EntityRef message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns EntityRef
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.common.v1.EntityRef;

                    /**
                     * Creates a plain object from an EntityRef message. Also converts values to other types if specified.
                     * @param message EntityRef
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.common.v1.EntityRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EntityRef to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for EntityRef
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace EntityRef {

                    /** Properties of an EntityRef. */
                    interface $Properties {

                        /** EntityRef schemaUrl */
                        schemaUrl?: (string|null);

                        /** EntityRef type */
                        type?: (string|null);

                        /** EntityRef idKeys */
                        idKeys?: (string[]|null);

                        /** EntityRef descriptionKeys */
                        descriptionKeys?: (string[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of an EntityRef. */
                    type $Shape = opentelemetry.proto.common.v1.EntityRef.$Properties;
                }
            }
        }

        /** Namespace resource. */
        namespace resource {

            /** Namespace v1. */
            namespace v1 {

                /**
                 * Properties of a Resource.
                 * @deprecated Use opentelemetry.proto.resource.v1.Resource.$Properties instead.
                 */
                interface IResource extends opentelemetry.proto.resource.v1.Resource.$Properties {
                }

                /** Represents a Resource. */
                class Resource {

                    /**
                     * Constructs a new Resource.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: opentelemetry.proto.resource.v1.Resource.$Properties);

                    /** Unknown fields preserved while decoding when enabled */
                    $unknowns?: Uint8Array[];

                    /** Resource attributes. */
                    attributes: opentelemetry.proto.common.v1.KeyValue.$Properties[];

                    /** Resource droppedAttributesCount. */
                    droppedAttributesCount: number;

                    /** Resource entityRefs. */
                    entityRefs: opentelemetry.proto.common.v1.EntityRef.$Properties[];

                    /**
                     * Creates a new Resource instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Resource instance
                     */
                    static create(properties: opentelemetry.proto.resource.v1.Resource.$Shape): opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape;
                    static create(properties?: opentelemetry.proto.resource.v1.Resource.$Properties): opentelemetry.proto.resource.v1.Resource;

                    /**
                     * Encodes the specified Resource message. Does not implicitly {@link opentelemetry.proto.resource.v1.Resource.verify|verify} messages.
                     * @param message Resource message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encode(message: opentelemetry.proto.resource.v1.Resource.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Resource message, length delimited. Does not implicitly {@link opentelemetry.proto.resource.v1.Resource.verify|verify} messages.
                     * @param message Resource message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    static encodeDelimited(message: opentelemetry.proto.resource.v1.Resource.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Resource message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns {opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape} Resource
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape;

                    /**
                     * Decodes a Resource message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns {opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape} Resource
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): opentelemetry.proto.resource.v1.Resource & opentelemetry.proto.resource.v1.Resource.$Shape;

                    /**
                     * Verifies a Resource message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Resource message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Resource
                     */
                    static fromObject(object: { [k: string]: any }): opentelemetry.proto.resource.v1.Resource;

                    /**
                     * Creates a plain object from a Resource message. Also converts values to other types if specified.
                     * @param message Resource
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    static toObject(message: opentelemetry.proto.resource.v1.Resource, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Resource to JSON.
                     * @returns JSON object
                     */
                    toJSON(): { [k: string]: any };

                    /**
                     * Gets the type url for Resource
                     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
                     * @returns The type url
                     */
                    static getTypeUrl(prefix?: string): string;
                }

                namespace Resource {

                    /** Properties of a Resource. */
                    interface $Properties {

                        /** Resource attributes */
                        attributes?: (opentelemetry.proto.common.v1.KeyValue.$Properties[]|null);

                        /** Resource droppedAttributesCount */
                        droppedAttributesCount?: (number|null);

                        /** Resource entityRefs */
                        entityRefs?: (opentelemetry.proto.common.v1.EntityRef.$Properties[]|null);

                        /** Unknown fields preserved while decoding when enabled */
                        $unknowns?: Uint8Array[];
                    }

                    /** Shape of a Resource. */
                    type $Shape = {
                      attributes?: opentelemetry.proto.common.v1.KeyValue.$Shape[]|null;
                      droppedAttributesCount?: number|null;
                      entityRefs?: opentelemetry.proto.common.v1.EntityRef.$Shape[]|null;
                      $unknowns?: Uint8Array[];
                    };
                }
            }
        }
    }
}
