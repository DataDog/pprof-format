Files in this directory are generated or vendored files. Do not edit.

The `.proto` files under `opentelemetry/` are copied unmodified from
opentelemetry-proto. `otel.js` and `otel.d.ts` are generated from them with
protobufjs; to regenerate, use the `proto:otel` run script in package.json.
They are only used by tests, to check this package's OTel codec against an
independent implementation.

URL: https://github.com/open-telemetry/opentelemetry-proto/tree/v1.11.1
Version: v1.11.1
License: Apache 2.0
Files:
       opentelemetry/proto/profiles/v1development/profiles.proto
       opentelemetry/proto/common/v1/common.proto
       opentelemetry/proto/resource/v1/resource.proto
       opentelemetry/proto/collector/profiles/v1development/profiles_service.proto
