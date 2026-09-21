import { Version } from "./version";
import { Resource } from "./resources";

export interface ApiConfig {
    name: string;
    description: string;
    host: string;
    port: number;
    status: string;
    version: Version;  //1.0.0
    resources: Resource[];

}