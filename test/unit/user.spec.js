
const {ServiceBroker} = require("moleculer")
const {ValidationError} = require("moleculer").Errors
const TestService = require("../../services/user.service")

describe("Test 'user' service", () => {
	let broker = new ServiceBroker({logger: false})
	broker.createService(TestService)

	beforeAll(() => broker.start())
	afterAll(() => broker.stop())

	describe("Test 'user.test' action", () => {
		it("should return a string", () => {
			expect(broker.call("user.test", "Sup"))
			.resolves.toMatch("Sup, John")
		})
	})
})