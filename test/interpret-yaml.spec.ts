import { expect } from 'chai';
import { Technician, Interpret, ConfigSource, ManualConfigSource, Uplevel } from 'technician';
import '../src';

const TEST_STR = `contents:
  - foo
  - bar
some: yaml`;
const TEST_BUF = Buffer.from(TEST_STR);
const EXPECTED = {some: 'yaml', contents: ['foo', 'bar']}

describe('interpret-yaml', () => {

    describe('& Integration', () => {

        it('should interpret values returned by a Technician ConfigSource.', async () => {
            // Build and configure Technician
            const tech = new Technician(Interpret.buffer.asYAML(new ManualConfigSource({yaml: TEST_BUF})));

            // Attempt a read through Technician
            const result = await tech.read('yaml');

            // Assertions
            expect(result).to.deep.equal(EXPECTED);
        });

        it('should modify the Technician Interpret API', async () => {
            expect(Interpret.buffer.asYAML).to.not.equal(undefined);
            expect(Interpret.buffer.asStringOrYAML).to.not.equal(undefined);
            expect(Interpret.string.asYAML).to.not.equal(undefined);
            expect(Interpret.string.asStringOrYAML).to.not.equal(undefined);
        });

    });

    describe('> Unit', () => {

        describe('#buffer.asYAML', () => {

            it('should return an interpreter that parses valid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.buffer.asYAML({
                    read: () => TEST_BUF,
                    list: () => ['yaml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an interpreter that returns undefined for invalid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.buffer.asYAML({
                    read: () => Buffer.from(':'),
                    list: () => ['yaml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.equal(undefined);
            });


            it('should return an interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.buffer.asYAML({
                    read: () => undefined,
                    list: () => ['yaml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });

        describe('#buffer.asStringOrYAML', () => {

            it('should return an interpreter that parses valid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.buffer.asStringOrYAML({
                    read: () => TEST_BUF,
                    list: () => ['yaml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an interpreter that returns unparsed strings for invalid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.buffer.asStringOrYAML({
                    read: () => Buffer.from(':'),
                    list: () => ['yaml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.equal(':');
            });


            it('should return an interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.buffer.asStringOrYAML({
                    read: () => undefined,
                    list: () => ['yaml']
                } as any as ConfigSource<Buffer>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });

        describe('#string.asYAML', () => {

            it('should return an interpreter that parses valid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.string.asYAML({
                    read: () => TEST_STR,
                    list: () => ['yaml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an interpreter that returns undefined for invalid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.string.asYAML({
                    read: () => ':',
                    list: () => ['yaml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.equal(undefined);
            });


            it('should return an interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.string.asYAML({
                    read: () => undefined,
                    list: () => ['yaml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });

        describe('#string.asStringOrYAML', () => {

            it('should return an interpreter that parses valid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.string.asStringOrYAML({
                    read: () => TEST_STR,
                    list: () => ['yaml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.deep.equal(EXPECTED);
            });

            it('should return an interpreter that returns unparsed strings for invalid YAML.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.string.asStringOrYAML({
                    read: () => ':',
                    list: () => ['yaml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('yaml');

                // Assertions
                expect(result).to.equal(':');
            });

            it('should return an interpreter that returns undefined for undefined keys.', async () => {
                // Build and configure a YAML interpreter
                const testInterpreter = Interpret.string.asStringOrYAML({
                    read: () => undefined,
                    list: () => ['yaml']
                } as any as ConfigSource<string>);
                const result = await testInterpreter.read('nope');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });
    });

});