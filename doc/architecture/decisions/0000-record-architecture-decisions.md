# 0. Record architecture decisions

Date: 2024-02-22

## Status

Accepted

## Context

We need a tool to record and manage Architecture Decision Records (ADRs) effectively in our project. The ADRs help us document the decisions we make regarding the architecture of our system, providing valuable insights for future reference and ensuring consistency across the team.

## Decision

After evaluating different options for managing ADRs, we have chosen to adopt the [adr-tool](https://github.com/npryce/adr-tools) over the other adr tools available. By choosing the adr-tool as our ADR management tool, we anticipate the following implications:

* The adr-tool provides a simple and intuitive command-line interface, which makes it easy for team members to create, update, and reference ADRs without a steep learning curve. Its minimalistic approach aligns well with our preference for tools that are straightforward and efficient.

* The adr-tool supports plain text files, which are easy to read and edit using any text editor.


## Consequences

By selecting the adr-tool as our ADRs management tool, we anticipate the following consequences: 

* The adr-tool, although efficient, may lack some advanced features, customization options, and a UI which are available in other ADR management tools such as adr-manager. This could become a learning curve depending on how comformtable users are with using the command line.

* There is always the risk that maintenance could cease completely and if this were to happen, it could lead to issues with compatibility, security, or bug fixes. Those issues could require us to either invest resources into maintaining the tool ourselves or transition to an alternative solution. As of right now, the last release for the adr-tool was in 2018.

* While the adr-tool appears to be actively used, the level of community support and resources may vary over time.

* While the adr-tool facilitates ADR management, its adoption does not guarantee high-quality documentation. There's still a risk that ADRs may be poorly written, incomplete, or not updated as necessary, which could impact decision-making and system understanding in the long term.


## More information

See Michael Nygard's article, linked above. For a lightweight ADR toolset, see Nat Pryce's [adr-tools](https://github.com/npryce/adr-tools).

See [MADR examples](https://adr.github.io/madr/examples.html) to learn more about the formatting of ADRs.