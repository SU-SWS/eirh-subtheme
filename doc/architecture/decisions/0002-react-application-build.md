# 2. React Application Build

Date: 2024-02-23

## Status

Accepted

## Context

We need to select a toolchain for developing our React-based web application. The toolchain should provide efficient development workflows, fast builds, and seamless integration with the React ecosystem. Two popular options under consideration are Create React App (CRA) and Vite + React.

## Decision

After careful evaluation, we have chosen to use Vite + React instead of Create React App (CRA) for our project's tool.

* While Create React App (CRA) has been a longstanding choice for React projects, it is no longer recommended by the core developers. 

* In addition to that, Vite has gained traction within the React community due to its superior performance and developer experience. As a result, Vite integrates seamlessly with the wider React ecosystem, including popular libraries, tools, and plugins, ensuring compatibility and support for future developments.

* Vite leverages modern ES module imports and native browser support for ES modules, resulting in significantly faster build times compared to CRA. This speed advantage can translate to quicker feedback loops during development along with enhancing developer productivity.

* Vite provides a minimalistic and flexible configuration setup, allowing developers to tailor the build process to specific project requirements easily. This flexibility empowers teams to optimize build configurations for performance, code splitting, and other optimization strategies without being constrained by predefined configurations.


## Consequences

By selecting Vite as our toolchain, we anticipate the following consequences:

* Transitioning to Vite from Create React App may introduce a learning curve for team members who are unfamiliar with Vite's configuration and features. This could temporarily slow down development as developers get up to speed with the new toolchain.

* While Vite has gained popularity within the React community, it may not have the same level of tooling and ecosystem support as Create React App. Some libraries, plugins, or tools may be less well-integrated or documented with Vite, requiring additional effort to find suitable alternatives or workarounds.

* Although Vite is gaining traction, it may not have reached the same level of community adoption as Create React App. This could mean fewer resources, tutorials, and community-driven solutions available for troubleshooting or extending the toolchain, potentially leading to longer resolution times for issues.

* While Vite offers significant performance benefits over Create React App, it's essential to manage expectations regarding the extent of these improvements. Factors such as project size, complexity, and individual development environments can influence actual performance gains, and unrealistic expectations could lead to disappointment or frustration.

## Pros and Cons of the Options

### Vite + React

* Good, fast build times and leveraging modern JavaScript features for optimization.
* Good, built-in support for Hot Module Replacement (HMR).
* Good, Flexible configuration options which allows for tailored setups based on project requirements.
* Good, strong community momentum and adoption within the React ecosystem.
* Good, Seamless integration with the latest React features and libraries.
* Bad, learning curve for developers transitioning from other toolchains.
* Bad, potentially limited tooling and ecosystem support compared to more established alternatives.
* Bad, dependency on ongoing maintenance and updates from Vite's development team.

### Create React App

* Good, opinionated, out-of-the-box setup, requiring minimal configuration to get started.
* Good, well-established ecosystem and extensive tooling support within the React community.
* Good, simplified development workflow, suitable for beginners and rapid prototyping.
* Bad, no longer receiving updates and maintenance from Facebook's React team.
* Bad, slower build times compared to Vite, especially for larger projects.
* Bad, limited flexibility in configuration, potentially restricting customization options.

## More information

* [Vite](https://vitejs.dev/guide/)
* [Create React App (CRA)](https://create-react-app.dev/)
