import React from "react";
import {RelationshipData} from "./RelationshipNode";
import {ElementFormatType} from "lexical";
import {RelationshipComponent} from "./components/RelationshipComponent";

export function getRelationshipNode(className: string, data: RelationshipData, format: ElementFormatType, nodeKey: string): JSX.Element {
    return (
        <RelationshipComponent
            className={className}
            data={data}
            format={format}
            nodeKey={nodeKey}
        />
    )
}