/**
 *  Copyright 2021 Carrie J Vrtis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { ConfigSource, Interpret, Interpreter, SupportedEncoding } from 'technician';
import { load as parseYAML } from 'js-yaml';

declare module 'technician' {
    export interface InterpretBuffer {
        /** 
         * Returns a JSON object or primitive representing the YAML contents of the buffer, or undefined if it does not contain valid YAML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asYAML: (configSource: ConfigSource<Buffer>, encoding?: SupportedEncoding) => Interpreter<Buffer, ReturnType<typeof parseYAML>>;

        /** 
         * Returns a JSON object or primitive  representing the YAML contents of the buffer, or a plaintext string if it does not contain valid YAML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asStringOrYAML: (configSource: ConfigSource<Buffer>, encoding?: SupportedEncoding) => Interpreter<Buffer, ReturnType<typeof parseYAML> | string>;
    }

    export interface InterpretString {
        /** 
         * Returns a JSON object or primitive representing the YAML contents of the string, or undefined if it does not contain valid YAML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asYAML: (configSource: ConfigSource<string>, encoding?: SupportedEncoding) => Interpreter<string, ReturnType<typeof parseYAML>>;

        /** 
         * Returns a JSON object or primitive representing the YAML contents of the string, or the plaintext string if it does not contain valid YAML.
         * @param encoding The text encoding to use. Default `utf8`.
         */
        asStringOrYAML: (configSource: ConfigSource<string>, encoding?: SupportedEncoding) => Interpreter<string, ReturnType<typeof parseYAML> | string>;
    }
}

Interpret.buffer.asYAML = (configSource, encoding = 'utf8') => {
    return new Interpreter(configSource, entity => {
        const text = entity.value?.toString(encoding);
        try {
            return text ? parseYAML(text) : undefined;
        }
        catch {
            return undefined;
        }
    });
};

Interpret.buffer.asStringOrYAML = (configSource, encoding = 'utf8') => {
    return new Interpreter(configSource, entity =>{
        const text = entity.value?.toString(encoding);
        try {
            return text ? parseYAML(text) : undefined;
        }
        catch {
            return text;
        }
    });
}; 

Interpret.string.asYAML = configSource => {
    return new Interpreter(configSource, entity =>{
        try {
            return entity.value ? parseYAML(entity.value) : undefined;
        }
        catch {
            return undefined;
        }
    });
};

Interpret.string.asStringOrYAML = configSource => {
    return new Interpreter(configSource, entity =>{
        try {
            return entity.value ? parseYAML(entity.value) : undefined;
        }
        catch {
            return entity.value;
        }
    });
}; 
