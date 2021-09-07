/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  school: {
    nested: {
      PBClass: {
        fields: {
          classId: {
            type: "int64",
            id: 0
          },
          name: {
            type: "string",
            id: 1
          }
        }
      },
      PBStudent: {
        fields: {
          studentId: {
            rule: "required",
            type: "int64",
            id: 0
          },
          user: {
            rule: "required",
            type: "PBUser",
            id: 1
          },
          "class": {
            rule: "required",
            type: "PBClass",
            id: 2
          },
          degree: {
            rule: "required",
            type: "PBStudentDegree",
            id: 3
          }
        }
      },
      PBStudentDegree: {
        values: {
          PRIMARY: 0,
          MIDDLE: 1,
          SENIOR: 2,
          COLLEGE: 3
        }
      },
      PBStudentListReq: {
        fields: {
          offset: {
            rule: "required",
            type: "int32",
            id: 1
          },
          limit: {
            rule: "required",
            type: "int32",
            id: 2
          }
        }
      },
      PBStudentListRsp: {
        fields: {
          list: {
            rule: "repeated",
            type: "PBStudent",
            id: 1
          }
        }
      }
    }
  },
  framework: {
    nested: {
      PBMessageRequest: {
        fields: {
          type: {
            type: "int32",
            id: 1
          },
          messageData: {
            type: "bytes",
            id: 2
          },
          timestamp: {
            type: "int64",
            id: 3
          },
          version: {
            type: "string",
            id: 4
          },
          token: {
            type: "string",
            id: 14
          }
        }
      },
      PBMessageResponse: {
        fields: {
          type: {
            type: "int32",
            id: 3
          },
          messageData: {
            type: "bytes",
            id: 4
          },
          resultCode: {
            type: "int32",
            id: 6
          },
          resultInfo: {
            type: "string",
            id: 7
          }
        }
      },
      PBMessageType: {
        values: {
          getStudentList: 0
        }
      },
      PBUser: {
        fields: {
          userId: {
            rule: "required",
            type: "int32",
            id: 0
          },
          name: {
            rule: "required",
            type: "string",
            id: 1
          },
          mobile: {
            rule: "required",
            type: "string",
            id: 2
          }
        }
      }
    }
  }
});

module.exports = $root;
