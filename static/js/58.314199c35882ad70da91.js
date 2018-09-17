webpackJsonp([58],{819:function(n,t){n.exports='/*\n{\n  "DESCRIPTION" : "Hue\\/Saturation adjustment",\n  "ISFVSN" : "2",\n  "INPUTS" : [\n    {\n      "NAME" : "inputImage",\n      "TYPE" : "image"\n    },\n    {\n      "NAME" : "hue",\n      "TYPE" : "float",\n      "MAX" : 1,\n      "DEFAULT" : 0,\n      "MIN" : -1,\n      "LABEL" : "Hue"\n    },\n    {\n      "NAME" : "saturation",\n      "TYPE" : "float",\n      "MAX" : 1,\n      "DEFAULT" : 0,\n      "LABEL" : "Saturation",\n      "MIN" : -1\n    }\n  ],\n  "CREDIT" : "2xAA"\n}\n*/\n\nvoid main()\t{\n\tvec4 color = IMG_NORM_PIXEL(inputImage, isf_FragNormCoord.xy);\n\n\t/* hue adjustment */\n\tfloat angle = hue * 3.14159265;\n\tfloat s = sin(angle), c = cos(angle);\n\tvec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;\n\tfloat len = length(color.rgb);\n\tcolor.rgb = vec3(\n\t\tdot(color.rgb, weights.xyz),\n\t\tdot(color.rgb, weights.zxy),\n\t\tdot(color.rgb, weights.yzx)\n\t);\n\n\t/* saturation adjustment */\n\tfloat average = (color.r + color.g + color.b) / 3.0;\n\tif (saturation > 0.0) {\n\t\tcolor.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - saturation));\n\t} else {\n\t\tcolor.rgb += (average - color.rgb) * (-saturation);\n\t}\n\n\tgl_FragColor = color;\n}\n'}});