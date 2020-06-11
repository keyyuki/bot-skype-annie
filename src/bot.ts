// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, TurnContext } from 'botbuilder';

export class EchoBot extends ActivityHandler {
    public conversationReferences = {};
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            this.addConversationReference(context.activity);
            await context.sendActivity(`Đã nghe`);
            // By calling next() you ensure that the next BotHandler is run.
            await next();

            /*
            group : context.activity.conversation:
            { isGroup: true,
              id: '19:0daeb05c82e3491cbe3001fcbbc557dc@thread.skype' },
              */
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;

            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello I am a bot');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();

        });
        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context.activity);

            await next();
        });
    }

    public addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
}
