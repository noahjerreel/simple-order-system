/* Vendor modules */
import Yaml from "js-yaml";
import Fs from "fs";

/* Create CONSTANTS from the <environment>.env.yml file */
const CONSTANTS: {
    [key: string]:  string | string[] | number | number[]
} = {};

const env_file_name     = `${process.env.NODE_ENV?.trim()}.env.yml`;
const env_file_contents = Fs.readFileSync(`${__dirname.replace('/constants', '')}/${env_file_name}`, 'utf8');
const env_file_data     = Yaml.load(env_file_contents) as { [key: string]: string };

for(const key in env_file_data){
    CONSTANTS[key] = env_file_data[key];
}

export const ENV_CONSTANT = CONSTANTS;