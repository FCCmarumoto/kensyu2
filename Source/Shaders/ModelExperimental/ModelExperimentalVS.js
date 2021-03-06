//This file is automatically rebuilt by the Cesium build process.
export default "precision highp float;\n\
\n\
czm_modelVertexOutput defaultVertexOutput(vec3 positionMC) {\n\
    czm_modelVertexOutput vsOutput;\n\
    vsOutput.positionMC = positionMC;\n\
    vsOutput.pointSize = 1.0;\n\
    return vsOutput;\n\
}\n\
\n\
void main() \n\
{\n\
    // Initialize the attributes struct with all\n\
    // attributes except quantized ones.\n\
    ProcessedAttributes attributes;\n\
    initializeAttributes(attributes);\n\
\n\
    // Dequantize the quantized ones and add them to the\n\
    // attributes struct.\n\
    #ifdef USE_DEQUANTIZATION\n\
    dequantizationStage(attributes);\n\
    #endif\n\
\n\
    // Update the position for this instance in place\n\
    #ifdef HAS_INSTANCING\n\
    instancingStage(attributes.positionMC);\n\
        #ifdef USE_PICKING\n\
        v_pickColor = a_pickColor;\n\
        #endif\n\
    #endif\n\
\n\
    #if defined(HAS_FEATURES) && defined(FEATURE_ID_ATTRIBUTE)\n\
    Feature feature;\n\
    featureStage(feature);\n\
    cpuStylingStage(attributes.positionMC, feature);\n\
    updateFeatureStruct(feature);\n\
    #endif\n\
    \n\
    #ifdef HAS_CUSTOM_VERTEX_SHADER\n\
    czm_modelVertexOutput vsOutput = defaultVertexOutput(attributes.positionMC);\n\
    customShaderStage(vsOutput, attributes);\n\
    #endif\n\
\n\
    // Compute the final position in each coordinate system needed.\n\
    // This also sets gl_Position.\n\
    geometryStage(attributes);    \n\
\n\
    #ifdef PRIMITIVE_TYPE_POINTS\n\
        #ifdef HAS_CUSTOM_VERTEX_SHADER\n\
        gl_PointSize = vsOutput.pointSize;\n\
        #else\n\
        gl_PointSize = 1.0;\n\
        #endif\n\
    #endif\n\
}\n\
";
