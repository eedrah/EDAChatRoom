﻿using System.Web;
using System.Web.Optimization;

namespace EDAChatRoom {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/signalR").Include(
                "~/Scripts/jquery.signalR-{version}.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/App/signalRConnection.js",
                "~/Scripts/App/ConnectedUserModel.js",
                "~/Scripts/App/EventListeners.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/recievedmessages").Include(
                "~/Scripts/App/RecievedMessages/RecievedMessagesController.js",
                "~/Scripts/App/RecievedMessages/RecievedMessagesModel.js",
                "~/Scripts/App/RecievedMessages/RecievedMessagesView.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/sentmessages").Include(
                "~/Scripts/App/SentMessages/SignalRController.js",
                "~/Scripts/App/SentMessages/SignalRModel.js",
                "~/Scripts/App/SentMessages/SignalRView.js"
                ));
        }
    }
}
