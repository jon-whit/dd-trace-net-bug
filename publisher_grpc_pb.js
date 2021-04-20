// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var publisher_pb = require('./publisher_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_pubsub_v1alpha1_PublishRequest(arg) {
  if (!(arg instanceof publisher_pb.PublishRequest)) {
    throw new Error('Expected argument of type pubsub.v1alpha1.PublishRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_pubsub_v1alpha1_PublishRequest(buffer_arg) {
  return publisher_pb.PublishRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var PublisherService = exports.PublisherService = {
  publish: {
    path: '/pubsub.v1alpha1.Publisher/Publish',
    requestStream: false,
    responseStream: false,
    requestType: publisher_pb.PublishRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_pubsub_v1alpha1_PublishRequest,
    requestDeserialize: deserialize_pubsub_v1alpha1_PublishRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.PublisherClient = grpc.makeGenericClientConstructor(PublisherService);
